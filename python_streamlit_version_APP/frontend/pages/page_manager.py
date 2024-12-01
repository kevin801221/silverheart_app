from .pages import HomePage, DetectionPage, AlertPage, PlaceholderPage

class PageManager:
    def __init__(self):
        self.pages = {
            'home': HomePage(),
            'detection': DetectionPage(),
            'alert': AlertPage(),
            'personal': PlaceholderPage("個人設置"),
            'family': PlaceholderPage("家人管理"),
            'history': PlaceholderPage("操作記錄"),
            'guide': PlaceholderPage("防詐指南"),
            'terms': PlaceholderPage("使用條款"),
            'help': PlaceholderPage("幫助中心"),
            'settings': PlaceholderPage("系統設置")
        }

    def render_page(self, page_name):
        if page_name in self.pages:
            self.pages[page_name].render()
        else:
            st.error(f"頁面 '{page_name}' 不存在")