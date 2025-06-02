# Development Setup Guide

This guide will help you set up your development environment for the React Todo List project.

## 🛠 Prerequisites

### Required Software
- **Node.js** (v18.0.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`
- **Git**
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

### Recommended Tools
- **VS Code** with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint
  - Auto Rename Tag
  - Bracket Pair Colorizer
  - GitLens

## 🚀 Project Setup

### 1. Clone the Repository
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/SettingUpMcpServers.git
cd SettingUpMcpServers

# Add upstream remote
git remote add upstream https://github.com/StargrrlMoonlight/SettingUpMcpServers.git
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
# Copy environment template (if exists)
cp .env.example .env.local

# No environment variables needed for this project currently
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
SettingUpMcpServers/
├── .github/                 # GitHub templates and workflows
│   ├── copilot-instructions.md
│   └── PULL_REQUEST_TEMPLATE.md
├── public/                  # Static assets
│   └── vite.svg
├── src/                     # Source code
│   ├── components/          # React components
│   │   ├── AddTodo.jsx/.css
│   │   ├── Header.jsx/.css
│   │   ├── SaveIndicator.jsx/.css
│   │   ├── TodoItem.jsx/.css
│   │   └── TodoList.jsx/.css
│   ├── contexts/            # React contexts
│   │   └── ThemeContext.jsx
│   ├── hooks/               # Custom hooks
│   │   └── useLocalStorage.js
│   ├── utils/               # Utility functions
│   │   └── localStorage.js
│   ├── assets/              # Images, fonts, etc.
│   ├── App.jsx              # Main App component
│   ├── App.css              # Global App styles
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── eslint.config.js         # ESLint configuration
├── vite.config.js           # Vite configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project overview
```

## 🧪 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors automatically

# Testing
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
npm run test:ci          # Run tests in CI mode
```

## 🧪 Testing Framework

For comprehensive testing information, see **[TESTING.md](TESTING.md)**.

**Quick Reference:**
```bash
npm run test             # Run all tests
npm run test:watch       # Run tests in watch mode  
npm run test:coverage    # Run tests with coverage report
```

**Key Points:**
- 80% minimum code coverage requirement
- Vitest + React Testing Library stack
- Automated CI/CD integration
- Unit tests alongside source files

## 🔧 Development Workflow

### Daily Workflow
1. **Start your day**
   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Work on an issue**
   ```bash
   # Create feature branch
   git checkout -b feature/issue-{number}-{description}
   
   # Make changes
   npm run dev  # Keep this running
   
   # Test your changes
   npm run lint
   npm run build
   ```

3. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: your commit message"
   git push origin feature/issue-{number}-{description}
   ```

### Staying Updated
```bash
# Sync with upstream regularly
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## 🎨 Code Style Guidelines

### JavaScript/React
- Use functional components with hooks
- Use arrow functions for component definitions
- Destructure props and state
- Use meaningful variable names
- Add JSDoc comments for complex functions

```jsx
// ✅ Good
const TodoItem = ({ todo, onToggle, onDelete }) => {
  const handleToggle = () => onToggle(todo.id);
  
  return (
    <div className="todo-item">
      {/* Component JSX */}
    </div>
  );
};

// ❌ Avoid
function TodoItem(props) {
  return <div>{props.todo.text}</div>;
}
```

### CSS
- Use CSS Modules for component-specific styles
- Follow BEM methodology for class names
- Use CSS custom properties for theming
- Mobile-first responsive design

```css
/* ✅ Good */
.todo-item {
  --todo-padding: 1rem;
  --todo-border-radius: 0.5rem;
  
  padding: var(--todo-padding);
  border-radius: var(--todo-border-radius);
}

.todo-item__text {
  font-size: 1rem;
  line-height: 1.5;
}

.todo-item--completed {
  opacity: 0.7;
  text-decoration: line-through;
}
```

## 🐛 Debugging

### Common Issues

**Port 5173 is already in use**
```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9
# Or use a different port
npm run dev -- --port 3000
```

**Node modules issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Git conflicts**
```bash
# Reset to upstream main
git fetch upstream
git reset --hard upstream/main
```

### Development Tools
- **React Developer Tools** - Browser extension for debugging React
- **VS Code Debugger** - Set breakpoints in your code
- **Network Tab** - Monitor API calls and performance
- **Console** - Check for JavaScript errors

## 🚀 Deployment

For detailed deployment information including production builds, CI/CD pipeline, and release management, see **[DEPLOYMENT.md](DEPLOYMENT.md)**.

## 📚 Learning Resources

### React & Vite
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Hooks Guide](https://react.dev/reference/react)

### CSS & Design
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Git & GitHub
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🆘 Getting Help

If you encounter issues:

1. **Check the documentation** in this repository
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Join discussions** in GitHub Discussions
5. **Ask for help** in pull request reviews

## ✅ Quick Setup Checklist

- [ ] Node.js v18+ installed
- [ ] Git configured with your GitHub account
- [ ] Repository forked and cloned
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm run dev`)
- [ ] VS Code with recommended extensions
- [ ] Familiar with project structure
- [ ] Read CONTRIBUTING.md guide
- [ ] Ready to pick your first issue!

Happy coding! 🎉
