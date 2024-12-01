import streamlit as st

class FunctionCards:
    @staticmethod
    def render():
        col1, col2 = st.columns(2)
        
        # 詐騙檢測卡片
        with col1:
            card1 = st.button(
                "🛡️ 詐騙檢測\nAI智能防禦",
                key="fraud_detection",
                use_container_width=True,
            )
            if card1:
                st.session_state.current_page = "detection"
                
        # 警報中心卡片
        with col2:
            card2 = st.button(
                "🔔 警報中心\n2則新警訊",
                key="alert_center",
                use_container_width=True,
            )
            if card2:
                st.session_state.current_page = "alerts"