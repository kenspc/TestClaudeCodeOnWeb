# 📸 照片搜索与收藏网站

一个简约优雅的纯前端照片搜索和收藏平台，让用户可以轻松搜索、保存和管理心仪的照片。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## ✨ 功能特性

- 🔍 **智能搜索** - 从多个来源搜索海量高质量照片
- 💾 **本地收藏** - 使用浏览器本地存储保存喜爱的照片URL
- 👤 **个性化体验** - 首次访问时设置用户名，无需注册登录
- 🖼️ **收藏管理** - 一目了然地查看所有收藏的照片
- 🗑️ **快速删除** - 轻松管理和删除不需要的收藏
- 📱 **响应式设计** - 完美适配手机、平板和桌面设备
- 🎨 **简约美观** - 专业的UI设计，白色与浅橙色的优雅配色

---

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| **HTML5** | 语义化标签，提供良好的页面结构 |
| **CSS3** | 现代样式特性，实现流畅动画效果 |
| **Bootstrap 5** | 响应式布局框架，快速构建美观界面 |
| **JavaScript (ES6+)** | 原生JavaScript，无框架依赖 |
| **LocalStorage API** | 浏览器本地数据持久化存储 |
| **Cookie API** | 用户身份识别与会话管理 |

---

## 🚀 快速开始

### 方法一：直接打开（推荐用于快速预览）

```bash
# 克隆项目
git clone https://github.com/kenspc/TestClaudeCodeOnWeb.git

# 进入项目目录
cd TestClaudeCodeOnWeb

# 用浏览器直接打开 index.html
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### 方法二：使用本地服务器（推荐用于开发）

#### 使用 VS Code Live Server

1. 安装 [Live Server 扩展](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

#### 使用 Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# 然后访问 http://localhost:8000
```

#### 使用 Node.js

```bash
# 安装 http-server (首次使用)
npm install -g http-server

# 启动服务器
http-server -p 8000

# 然后访问 http://localhost:8000
```

---

## 📂 项目结构

```
TestClaudeCodeOnWeb/
├── index.html              # 主页面 - 应用入口
├── css/
│   ├── style.css          # 自定义样式
│   └── responsive.css     # 响应式样式（可选）
├── js/
│   ├── app.js             # 主应用逻辑
│   ├── storage.js         # 本地存储管理
│   ├── search.js          # 搜索功能模块
│   └── ui.js              # UI 交互处理
├── assets/
│   ├── images/            # 图片资源
│   └── icons/             # 图标资源
├── .gitignore             # Git 忽略文件配置
├── .gitattributes         # Git 属性配置
└── README.md              # 项目说明文档
```

---

## 💡 使用说明

### 首次使用

1. **设置用户名**
   - 首次访问时，系统会弹出欢迎对话框
   - 输入您的名字（将保存在Cookie中）
   - 之后每次访问都会显示您的名字

2. **搜索照片**
   - 在搜索框中输入关键词（如"夕阳"、"自然"、"城市"）
   - 点击搜索按钮或按回车键
   - 浏览搜索结果中的照片

3. **收藏照片**
   - 点击照片上的"收藏"按钮
   - 照片URL将保存到浏览器本地存储
   - 可以随时在"我的收藏"页面查看

4. **管理收藏**
   - 切换到"我的收藏"标签页
   - 查看所有已收藏的照片
   - 点击"删除"按钮移除不需要的照片

### 数据说明

- **用户数据存储位置**：浏览器 Cookie 和 LocalStorage
- **数据持久性**：数据保存在本地，清除浏览器数据后会丢失
- **隐私保护**：所有数据仅存储在您的设备上，不会上传到服务器

---

## 🎨 设计风格

### 颜色方案

| 颜色 | 用途 | 十六进制 |
|------|------|----------|
| 白色 | 主背景色 | `#FFFFFF` |
| 浅橙色 | 主题色/强调色 | `#FFB347` |
| 深橙色 | 按钮悬停 | `#FF9A1F` |
| 深灰色 | 文字颜色 | `#333333` |
| 浅灰色 | 边框/分割线 | `#E0E0E0` |

### 设计原则

- **简约至上** - 去除冗余元素，保留核心功能
- **用户友好** - 直观的交互设计，降低学习成本
- **视觉舒适** - 柔和的配色，适中的对比度
- **响应灵敏** - 快速的页面加载和流畅的动画

---

## 🌐 浏览器兼容性

| 浏览器 | 最低版本 | 状态 |
|--------|----------|------|
| Chrome | 90+ | ✅ 完全支持（推荐） |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |
| Opera | 76+ | ✅ 完全支持 |
| IE | - | ❌ 不支持 |

---

## 🗺️ 开发路线图

### ✅ 第一阶段 - 基础功能（当前）
- [x] 项目初始化
- [x] 版本控制配置
- [x] README 文档编写
- [ ] 基础页面结构
- [ ] 用户名输入功能
- [ ] 照片搜索功能
- [ ] 收藏管理功能

### 🔄 第二阶段 - 功能增强（计划中）
- [ ] 照片预览放大功能
- [ ] 为收藏添加备注功能
- [ ] 搜索历史记录
- [ ] 收藏分类管理
- [ ] 导出收藏列表

### 🚀 第三阶段 - 体验优化（未来）
- [ ] 暗黑模式支持
- [ ] 多语言支持（中文/英文）
- [ ] PWA 支持（离线访问）
- [ ] 更多主题色选择
- [ ] 键盘快捷键支持

---

## 🤝 贡献指南

欢迎提交问题和贡献代码！

### 如何贡献

1. Fork 本项目
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

### 代码规范

- 使用 2 空格缩进
- 遵循 ESLint 规则
- 编写清晰的注释
- 保持代码简洁易读

---

## 📝 更新日志

### [0.1.0] - 2025-10-23
- 项目初始化
- 添加版本控制文件 (.gitignore, .gitattributes)
- 创建项目 README 文档

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 👨‍💻 作者

- **Your Name** - *Initial work*

---

## 🙏 致谢

- [Bootstrap](https://getbootstrap.com/) - 优秀的前端框架
- [Unsplash](https://unsplash.com/) - 高质量的免费图片资源
- [Font Awesome](https://fontawesome.com/) - 丰富的图标库

---

<div align="center">

**如果这个项目对您有帮助，请给一个 ⭐️ Star 支持一下！**

Made with ❤️ by Claude Code

</div>
