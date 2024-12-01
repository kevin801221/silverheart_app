import streamlit as st

class ActionButtons:
    def render(self):
        col1, col2 = st.columns(2)
        with col1:
            st.markdown(
                '<div class="action-button-red">🔒 凍結交易</div>',
                unsafe_allow_html=True
            )
        with col2:
            st.markdown(
                '<div class="action-button-blue">📞 聯絡家人</div>',
                unsafe_allow_html=True
            )