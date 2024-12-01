import streamlit as st

class Metrics:
    def render(self):
        with st.container():
            col1, col2 = st.columns(2)
            with col1:
                st.markdown(
                    '<div class="metric-container">'
                    '<h4>今日已阻擋詐騙次數</h4>'
                    '<h2>3</h2>'
                    '</div>',
                    unsafe_allow_html=True
                )
            with col2:
                st.markdown(
                    '<div class="metric-container">'
                    '<h4>當前風險等級</h4>'
                    '<h2 style="color: #f44336;">高</h2>'
                    '</div>',
                    unsafe_allow_html=True
                )