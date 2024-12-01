import streamlit as st

class Warning:
    def render(self):
        st.markdown(
            '<div class="warning-box">'
            '⚠️ Potential Scam Detected!<br>'
            '檢測到可疑詐騙嘗試'
            '</div>',
            unsafe_allow_html=True
        )