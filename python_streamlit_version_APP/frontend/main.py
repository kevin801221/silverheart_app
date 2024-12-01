import streamlit as st
from pages.page_manager import PageManager

def set_page_config():
    st.set_page_config(
        page_title="智能防詐系統",
        page_icon="🛡️",
        layout="wide",
        initial_sidebar_state="collapsed"
    )
    
    # 自定義 CSS
    st.markdown("""
        <style>
        /* 隱藏 Streamlit 默認元素 */
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {visibility: hidden;}
        [data-testid="stSidebar"] {display: none;}
        
        /* 頂部導航欄 */
        .top-banner {
            background-color: #1E88E5;
            padding: 1rem;
            color: white;
            font-size: 20px;
            font-weight: bold;
            margin: -1rem -1rem 1rem -1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        /* 主導航按鈕 */
        .nav-button {
            background-color: #002855;
            color: white;
            padding: 2rem;
            border-radius: 10px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
            height: 150px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 10px 0;
        }
        
        .nav-button:hover {
            background-color: #003B7A;
            transform: translateY(-2px);
        }
        
        .nav-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        
        .nav-text {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
        }
        
        .nav-subtext {
            font-size: 0.8rem;
            opacity: 0.8;
        }
        
        /* 設置按鈕 */
        .settings-button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 5px 10px;
            border-radius: 5px;
        }
        
        .settings-button:hover {
            background: rgba(255,255,255,0.1);
        }
        </style>
    """, unsafe_allow_html=True)

def render_top_banner():
    st.markdown(
        '<div class="top-banner">'
        '<div>🛡️ 暖心永晉 - 智能防詐系統</div>'
        '<div class="settings-button">⚙️</div>'
        '</div>',
        unsafe_allow_html=True
    )

def render_navigation():
    # 自定義按鈕布局
    col1, col2, col3 = st.columns(3)
    
    with col1:
        if st.button('🛡️\n詐騙檢測\nAI智能防禦', 
                     key='detection_nav',
                     use_container_width=True):
            st.session_state.current_page = 'detection'
            st.experimental_rerun()
            
    with col2:
        if st.button('🔔\n警報中心\n2則新警訊', 
                     key='alert_nav',
                     use_container_width=True):
            st.session_state.current_page = 'alert'
            st.experimental_rerun()
            
    with col3:
        if st.button('👥\n家人管理\n管理緊急聯絡人', 
                     key='family_nav',
                     use_container_width=True):
            st.session_state.current_page = 'family'
            st.experimental_rerun()

def initialize_session_state():
    if 'current_page' not in st.session_state:
        st.session_state.current_page = 'home'

def main():
    initialize_session_state()
    set_page_config()
    render_top_banner()
    
    if st.session_state.current_page == 'home':
        # 顯示主頁面
        render_navigation()
    else:
        # 渲染其他頁面
        page_manager = PageManager()
        page_manager.render_page(st.session_state.current_page)
        
        # 返回首頁按鈕
        if st.button('⬅️ 返回首頁'):
            st.session_state.current_page = 'home'
            st.experimental_rerun()

if __name__ == "__main__":
    main()