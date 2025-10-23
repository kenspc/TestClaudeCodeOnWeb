# 📸 Photo Search & Collection Web App

A minimalist and elegant front-end photo search and collection platform that allows users to easily search, save, and manage their favorite photos.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## ✨ Features

- 🔍 **Smart Search** - Search high-quality photos from multiple sources
- 💾 **Local Collection** - Save favorite photo URLs using browser local storage
- 👤 **Personalized Experience** - Set username on first visit, no registration required
- 🖼️ **Collection Management** - View all saved photos at a glance
- 🗑️ **Quick Delete** - Easily manage and remove unwanted collections
- 📱 **Responsive Design** - Perfectly adapted for mobile, tablet, and desktop devices
- 🎨 **Minimalist & Beautiful** - Professional UI design with white and light orange color scheme

---

## 🛠️ Tech Stack

| Technology | Description |
|------|------|
| **HTML5** | Semantic tags for better page structure |
| **CSS3** | Modern styling features with smooth animations |
| **Bootstrap 5** | Responsive layout framework for beautiful UI |
| **JavaScript (ES6+)** | Vanilla JavaScript with no framework dependencies |
| **LocalStorage API** | Browser-based persistent data storage |
| **Cookie API** | User identification and session management |

---

## 🚀 Quick Start

### Method 1: Direct Open (Recommended for Quick Preview)

```bash
# Clone the repository
git clone https://github.com/kenspc/TestClaudeCodeOnWeb.git

# Navigate to project directory
cd TestClaudeCodeOnWeb

# Open index.html directly in browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### Method 2: Using Local Server (Recommended for Development)

#### Using VS Code Live Server

1. Install [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Using Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Then visit http://localhost:8000
```

#### Using Node.js

```bash
# Install http-server (first time only)
npm install -g http-server

# Start the server
http-server -p 8000

# Then visit http://localhost:8000
```

---

## 📂 Project Structure

```
TestClaudeCodeOnWeb/
├── index.html              # Main page - Application entry point
├── css/
│   ├── style.css          # Custom styles
│   └── responsive.css     # Responsive styles (optional)
├── js/
│   ├── app.js             # Main application logic
│   ├── storage.js         # Local storage management
│   ├── search.js          # Search functionality module
│   └── ui.js              # UI interaction handling
├── assets/
│   ├── images/            # Image resources
│   └── icons/             # Icon resources
├── .gitignore             # Git ignore configuration
├── .gitattributes         # Git attributes configuration
└── README.md              # Project documentation
```

---

## 💡 User Guide

### First Time Setup

1. **Set Username**
   - A welcome dialog will appear on first visit
   - Enter your name (will be saved in Cookie)
   - Your name will be displayed on each subsequent visit

2. **Search Photos**
   - Enter keywords in the search box (e.g., "sunset", "nature", "city")
   - Click the search button or press Enter
   - Browse through the photo results

3. **Save to Collection**
   - Click the "Save" button on any photo
   - Photo URL will be saved to browser's local storage
   - View saved photos anytime in "My Collection" tab

4. **Manage Collection**
   - Switch to "My Collection" tab
   - View all saved photos
   - Click "Delete" button to remove unwanted photos

### Data Information

- **Storage Location**: Browser Cookie and LocalStorage
- **Data Persistence**: Data is stored locally and will be lost if browser data is cleared
- **Privacy Protection**: All data is stored only on your device and never uploaded to any server

---

## 🎨 Design Style

### Color Scheme

| Color | Usage | Hex Code |
|------|------|----------|
| White | Primary background | `#FFFFFF` |
| Light Orange | Theme/Accent color | `#FFB347` |
| Dark Orange | Button hover state | `#FF9A1F` |
| Dark Gray | Text color | `#333333` |
| Light Gray | Borders/Dividers | `#E0E0E0` |

### Design Principles

- **Minimalism First** - Remove redundant elements, keep core functionality
- **User-Friendly** - Intuitive interaction design with low learning curve
- **Visual Comfort** - Soft color palette with moderate contrast
- **Responsive** - Fast page loading and smooth animations

---

## 🌐 Browser Compatibility

| Browser | Minimum Version | Status |
|--------|----------|------|
| Chrome | 90+ | ✅ Fully Supported (Recommended) |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Fully Supported |
| IE | - | ❌ Not Supported |

---

## 🗺️ Development Roadmap

### ✅ Phase 1 - Core Features (Current)
- [x] Project initialization
- [x] Version control setup
- [x] README documentation
- [ ] Basic page structure
- [ ] Username input functionality
- [ ] Photo search feature
- [ ] Collection management

### 🔄 Phase 2 - Feature Enhancement (Planned)
- [ ] Photo preview zoom functionality
- [ ] Add notes to saved photos
- [ ] Search history
- [ ] Collection categorization
- [ ] Export collection list

### 🚀 Phase 3 - Experience Optimization (Future)
- [ ] Dark mode support
- [ ] Multi-language support (Chinese/English)
- [ ] PWA support (offline access)
- [ ] Multiple theme color options
- [ ] Keyboard shortcuts

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and code contributions.

### How to Contribute

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- Use 2 spaces for indentation
- Follow ESLint rules
- Write clear comments
- Keep code clean and readable

---

## 📝 Changelog

### [0.1.0] - 2025-10-23
- Project initialization
- Added version control files (.gitignore, .gitattributes)
- Created comprehensive README documentation

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---

## 👨‍💻 Author

- **kenspc** - *Initial work*

---

## 🙏 Acknowledgments

- [Bootstrap](https://getbootstrap.com/) - Excellent front-end framework
- [Unsplash](https://unsplash.com/) - High-quality free photo resources
- [Font Awesome](https://fontawesome.com/) - Comprehensive icon library

---

<div align="center">

**If this project helps you, please give it a ⭐️ Star!**

Made with ❤️ by Claude Code

</div>
