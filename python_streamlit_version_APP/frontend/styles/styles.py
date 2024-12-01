def get_styles():
    return """
        <style>
        /* 隱藏 Streamlit 默認元素 */
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {visibility: hidden;}
        
        /* 頂部橫幅 */
        .top-banner {
            background-color: #1E88E5;
            color: white;
            padding: 1rem;
            font-size: 20px;
            font-weight: bold;
            margin: -1rem -1rem 1rem -1rem;
            display: flex;
            align-items: center;
        }
        
        /* 修改 Streamlit 按鈕樣式 */
        .stButton button {
            width: 100%;
            padding: 0.75rem;
            border: none;
            background-color: transparent;
            text-align: left;
            font-size: 16px;
            transition: background-color 0.3s;
        }
        
        .stButton button:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        /* 側邊欄樣式 */
        .css-1d391kg {
            background-color: #002855;
        }
        
        .css-1d391kg .stButton button {
            color: white;
        }
        
        /* 主要功能按鈕 */
        [data-testid="stButtonCard"] {
            background-color: #002855;
            color: white;
            height: 120px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 10px;
            padding: 1rem;
            margin: 0.5rem 0;
        }
        
        [data-testid="stButtonCard"]:hover {
            background-color: #003B7A;
        }
        
        /* 指標卡片 */
        .metric-container {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            margin: 10px 0;
        }
        
        /* 警告框 */
        .warning-box {
            background-color: #ffebee;
            border-left: 4px solid #f44336;
            color: #c62828;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 4px;
        }
        
        /* 操作按鈕 */
        .action-button {
            padding: 0.8rem;
            border-radius: 5px;
            text-align: center;
            cursor: pointer;
            font-weight: bold;
            margin: 5px 0;
        }
        
        .action-button-red {
            background-color: #f44336;
            color: white;
        }
        
        .action-button-blue {
            background-color: #1E88E5;
            color: white;
        }
        </style>
    """