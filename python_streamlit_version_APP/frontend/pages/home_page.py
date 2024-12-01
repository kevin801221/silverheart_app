import streamlit as st
from components.warning import Warning
from components.function_cards import FunctionCards
from components.metrics import Metrics
from components.buttons import ActionButtons

class HomePage:
    def render(self):
        warning = Warning()
        warning.render()
        
        function_cards = FunctionCards()
        function_cards.render()
        
        metrics = Metrics()
        metrics.render()
        
        action_buttons = ActionButtons()
        action_buttons.render()

# pages/detection_page.py
class DetectionPage:
    def render(self):
        st.title("詐騙檢測中心")
        
        # 即時監控區域
        st.subheader("即時監控")
        monitoring = {
            "通話監控": "進行中",
            "詐騙語音識別": "進行中",
            "交易監控": "進行中"
        }
        
        for item, status in monitoring.items():
            col1, col2 = st.columns([3, 1])
            with col1:
                st.text(item)
            with col2:
                st.markdown(f'<span style="color: green;">✓ {status}</span>', unsafe_allow_html=True)
        
        # 安全設置區域
        st.subheader("安全設置")
        st.button("可疑號碼攔截", use_container_width=True)
        st.button("安全參數設置", use_container_width=True)

# pages/alert_page.py
class AlertPage:
    def render(self):
        st.title("警報中心")
        
        # 今日警報
        st.subheader("今日警報")
        st.markdown(
            '<div style="background-color: #ffebee; padding: 10px; border-left: 4px solid #f44336; margin: 10px 0;">'
            '⚠️ 高風險通話警報<br>檢測到可疑詐騙通話<br>今天 14:30'
            '</div>',
            unsafe_allow_html=True
        )
        
        # 歷史警報
        st.subheader("歷史警報")
        st.markdown(
            '<div style="background-color: #f5f5f5; padding: 10px; border-left: 4px solid #9e9e9e; margin: 10px 0;">'
            '🔔 系統警報 #1<br>已攔截詐騙電話<br>2024/03/20'
            '</div>',
            unsafe_allow_html=True
        )