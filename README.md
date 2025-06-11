# Executive Manager - Elegant Task Management

![Test & Deploy](https://github.com/StargrrlMoonlight/SettingUpMcpServers/actions/workflows/test-build-deploy.yml/badge.svg?branch=main)
![Coverage](https://img.shields.io/badge/coverage-92.85%25-brightgreen))))))))
[![code style: eslint](https://img.shields.io/badge/code%20style-eslint-blue.svg)](https://eslint.org/)

A sophisticated task management web application built with React and Vite, featuring an exclusive high-end design with neutral light colors and elegant dark typography.

## 🚀 Live Demo

- **Production**: [https://stargrrlmoonlight.github.io/SettingUpMcpServers](https://stargrrlmoonlight.github.io/SettingUpMcpServers)

## Features

- ✨ **Elegant Design**: Neutral light color palette with sophisticated typography
- 📱 **Responsive**: Mobile-first design that works beautifully on all devices
- 🎯 **Task Management**: Add, edit, complete, and delete tasks
- 📅 **Due Dates**: Set and track due dates with overdue detection and styling
- ⭐ **Priority Levels**: Organize tasks by High, Medium, or Low priority with visual badges
- 🔄 **Smart Sorting**: Sort tasks by priority, due date, alphabetical order, or creation date
- 🔍 **Filtering**: View all tasks, active tasks, or completed tasks
- 💾 **Data Persistence**: Tasks are automatically saved to localStorage
- 💫 **Smooth Animations**: Subtle transitions and hover effects
- ♿ **Accessible**: Proper contrast ratios and keyboard navigation

## Design Philosophy

The application follows a minimalist design approach with:
- Neutral color palette (light grays, off-whites, subtle warm tones)
- Classical dark fonts (Crimson Text for headlines, Inter for body text)
- Clean spacing and typography hierarchy
- Subtle shadows and elegant spacing
- Modern UI components with polished interactions

## Tech Stack

- **React** - Modern UI library with functional components and hooks
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with CSS variables and modern techniques
- **Google Fonts** - Crimson Text and Inter for elegant typography

## 🔄 Advanced Dual-Flow CI/CD Workflow

This project features a sophisticated 2-flow CI/CD system that delivers ~60% performance improvements through intelligent optimization:

### Optimized Test, Build & Deploy Pipeline
- **Dual-Flow Architecture**: Separate fast PR testing and comprehensive production workflows
- **Smart Performance**: ~60% faster execution through intelligent flow separation and caching
- **Matrix Testing**: Parallel testing on Node.js 18.x and 20.x with dependency optimization
- **7-Layer Safeguards**: Comprehensive infinite loop protection and error recovery systems
- **Quality Gates**: ESLint linting, automated testing with coverage, accessibility validation
- **GitHub Pages Deployment**: Automated deployment with health verification after all tests pass
- **Release Management**: Semantic versioning with automated artifact generation (.tar.gz, .zip)
- **Coverage Intelligence**: Automatic README badge updates with real-time coverage percentage

### Workflow Features
- **Flow 1 (PR Testing)**: Fast quality gates for immediate developer feedback
- **Flow 2 (Production)**: Complete build, deploy, and release pipeline after merge
- **Automated Recovery**: Self-healing mechanisms with comprehensive error handling
- **State Validation**: Multi-layer verification prevents deployment issues
- **Branch Protection**: Required status checks ensure code quality with GitHub Copilot integration

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 🤝 Contributing

We welcome contributions! Please see our contribution guidelines to get started:

- 🔄 **[Development Workflow](WORKFLOW.md)** - Complete development process and GitHub Copilot integration
- 📋 **[Contributing Guide](CONTRIBUTING.md)** - Complete guide for contributors
- 🛠 **[Development Setup](docs/SETUP.md)** - Detailed setup instructions
- 🧪 **[Testing Guide](docs/TESTING.md)** - Testing framework and coverage requirements
- 🚀 **[Deployment Guide](docs/DEPLOYMENT.md)** - CI/CD pipeline and release management
- 📝 **[Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md)** - PR guidelines

### Quick Start for Contributors

1. **Check Issues**: Browse [open issues](https://github.com/StargrrlMoonlight/SettingUpMcpServers/issues)
2. **Fork & Clone**: Fork the repo and clone your fork
3. **Create Branch**: `git checkout -b feature/issue-{number}-{description}`
4. **Make Changes**: Follow our coding standards and design guidelines
5. **Test**: Ensure your changes work on all devices
6. **Submit PR**: Create a pull request referencing the issue

### Development Workflow

We follow **GitHub Flow** with issue-driven development:
- Every change starts with a GitHub issue
- Feature branches for all development work  
- Pull requests require GitHub Copilot review before merging
- Clean commit history with conventional commits
- Branch protection with CI/CD quality gates

📖 **See [WORKFLOW.md](WORKFLOW.md) for complete workflow details and GitHub Copilot integration**

## 🎯 Current Roadmap

### Recently Completed
- ✅ **Due Dates & Priority Levels** - Help users manage time and focus with visual indicators and overdue detection

### Priority Features
- 🏷️ **Categories & Tags** - Organize tasks by project or context  
- 🎯 **Drag & Drop Reordering** - Visual task prioritization

See our [Issues](https://github.com/StargrrlMoonlight/SettingUpMcpServers/issues) for detailed feature requests and bug reports.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── Header.jsx         # Application header with title
│   ├── TodoList.jsx       # Main todo list container
│   ├── TodoItem.jsx       # Individual todo item
│   ├── AddTodo.jsx        # Add new todo form
│   ├── SaveIndicator.jsx  # Visual save confirmation
│   └── *.css              # Component-specific styles
├── hooks/
│   └── useLocalStorage.js # Custom hook for localStorage management
├── utils/
│   └── localStorage.js    # LocalStorage utilities and constants
├── App.jsx                # Main application component
├── App.css                # Global application styles
├── index.css              # Global CSS variables and reset
└── main.jsx               # Application entry point
```

## Data Persistence

Your tasks are automatically saved to your browser's localStorage, meaning they'll persist between sessions. The application includes:

- **Automatic saving**: All changes are saved immediately
- **Visual feedback**: A subtle "Saved" indicator appears when data is stored
- **Data recovery**: Your tasks will be restored when you return to the app
- **Backward compatibility**: Existing tasks are automatically migrated to support new features
- **Development utilities**: Use browser console commands for data management

## Task Management Features

### Priority Levels
Tasks can be assigned three priority levels with visual indicators:
- **High Priority** (Red badge): Critical tasks that need immediate attention
- **Medium Priority** (Yellow badge): Standard tasks with normal importance
- **Low Priority** (Green badge): Tasks that can be completed when time allows

### Due Dates & Overdue Detection
- Set specific due dates when creating or editing tasks
- Visual due date display shows the formatted date
- **Overdue Detection**: Tasks past their due date automatically display "Overdue" indicators with red styling and subtle animations
- Sort tasks by due date to prioritize upcoming deadlines

### Smart Sorting Options
Organize your tasks with multiple sorting options:
- **Priority**: High → Medium → Low priority order
- **Due Date**: Earliest due dates first (tasks without dates appear last)
- **Alphabetical**: A-Z sorting by task text
- **Created**: Newest tasks first (default)

### Enhanced Editing
Double-click any task to edit:
- Update task text
- Change priority level
- Modify due date
- All changes save automatically

### Development Console Utilities

When running in development mode, you have access to these console commands:

```javascript
// Clear all stored data
todoUtils.clearAllData()

// Export your data as JSON
const backup = todoUtils.exportData()

// Import data from a backup
todoUtils.importData(backup)

// View current todos
todoUtils.getCurrentTodos()

// Show help
todoUtils.help()
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.
