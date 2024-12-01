import streamlit as st

class Header:
    def render(self):
        st.markdown(
            '<div class="top-banner">🛡️ 暖心永晉 - 智能防詐系統</div>',
            unsafe_allow_html=True
        )