# Executive Tasks - Elegant Todo List

![CI Status](https://github.com/StargrrlMoonlight/SettingUpMcpServers/actions/workflows/ci.yml/badge.svg?branch=main)
![CD Status](https://github.com/StargrrlMoonlight/SettingUpMcpServers/actions/workflows/cd.yml/badge.svg?branch=main)
![Coverage](https://img.shields.io/badge/coverage-82%25-success)
[![code style: eslint](https://img.shields.io/badge/code%20style-eslint-blue.svg)](https://eslint.org/)

A sophisticated todo-list web application built with React and Vite, featuring an exclusive high-end design with neutral light colors and elegant dark typography.

## 🚀 Live Demo

- **Production**: [https://stargrrlmoonlight.github.io/SettingUpMcpServers](https://stargrrlmoonlight.github.io/SettingUpMcpServers)
- **Staging**: Available after CI/CD pipeline completion

## Features

- ✨ **Elegant Design**: Neutral light color palette with sophisticated typography
- 📱 **Responsive**: Mobile-first design that works beautifully on all devices
- 🎯 **Task Management**: Add, edit, complete, and delete tasks
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

## 🔄 CI/CD Workflows

This project uses separate Continuous Integration and Continuous Deployment workflows for better organization and security:

### Continuous Integration (CI)
- **Triggers**: Every push and pull request to main branch
- **Matrix Testing**: Tests on Node.js 18.x and 20.x
- **Quality Gates**: ESLint linting, automated testing with coverage, accessibility testing
- **Artifacts**: Build artifacts stored for 30 days with commit hash naming
- **Coverage**: Automatic README badge updates with coverage percentage

### Continuous Deployment (CD)
- **Staging**: Automatic deployment to GitHub Pages after successful CI
- **Production**: Manual approval required for production deployment
- **Health Checks**: Automated post-deployment verification
- **Rollback**: Manual rollback capability (when needed)
- **Environments**: Separate staging and production environments with protection rules

### Release Management
- **Automated Releases**: Created on version tags (v1.0.0 format)
- **Manual Releases**: Triggered via workflow dispatch with custom versioning
- **Changelog**: Auto-generated from commit messages
- **Assets**: Release packages in both tar.gz and zip formats

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

- 📋 **[Contributing Guide](CONTRIBUTING.md)** - Complete guide for contributors
- 🛠 **[Development Setup](docs/DEVELOPMENT_SETUP.md)** - Detailed setup instructions
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
- Pull requests require review before merging
- Clean commit history with conventional commits

## 🎯 Current Roadmap

### Priority Features
- 📅 **Due Dates & Priority Levels** - Help users manage time and focus
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
- **Development utilities**: Use browser console commands for data management

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
