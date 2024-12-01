import streamlit as st

class Sidebar:
    def __init__(self):
        self.menu_items = [
            ("👤", "個人設置", "personal"),
            ("👥", "家人管理", "family"),
            ("🕒", "操作記錄", "history"),
            ("📖", "防詐指南", "guide"),
            ("📄", "使用條款", "terms"),
            ("❓", "幫助中心", "help"),
            ("⚙️", "系統設置", "settings")
        ]

    def render(self):
        with st.sidebar:
            st.markdown("<h3 style='margin-bottom: 20px;'>系統選單</h3>", unsafe_allow_html=True)
            
            # 使用 st.button 來創建可點擊的按鈕
            for icon, label, key in self.menu_items:
                # 特殊樣式的個人設置按鈕
                if key == "personal":
                    if st.button(
                        f"{icon} {label}",
                        key=key,
                        use_container_width=True,
                        type="primary",
                    ):
                        st.session_state.current_page = key
                else:
                    # 普通樣式的按鈕
                    if st.button(
                        f"{icon} {label}",
                        key=key,
                        use_container_width=True,
                    ):
                        st.session_state.current_page = key