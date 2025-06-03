# Contributing to React Todo List

Welcome to our React Todo List project! This guide will help you get started with contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git
- VS Code (recommended)

### Initial Setup
1. **Fork and Clone the Repository**
   ```bash
   git clone https://github.com/StargrrlMoonlight/SettingUpMcpServers.git
   cd SettingUpMcpServers
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:5173`

## 📋 Development Workflow

### 1. Issue-Driven Development
We follow a strict issue-driven development process:

- **Always create a GitHub issue first** before starting any work
- Use descriptive titles with emojis for categorization:
  - 🐛 Bug fixes
  - ✨ New features
  - 📝 Documentation
  - 🎨 UI/UX improvements
  - ⚡ Performance improvements
- Include detailed acceptance criteria and technical considerations

### 2. Branch Strategy
We follow **GitHub Flow** with feature branches:

```bash
# Create and switch to a new feature branch
git checkout -b feature/issue-{number}-{short-description}

# Examples:
git checkout -b feature/issue-5-drag-drop-reordering
git checkout -b feature/issue-3-due-dates-priority
```

**Branch Naming Convention:**
- `feature/issue-{number}-{description}` - New features
- `bugfix/issue-{number}-{description}` - Bug fixes
- `docs/issue-{number}-{description}` - Documentation updates

### 3. Development Process

1. **Start with an Issue**
   - Check existing issues or create a new one
   - Assign yourself to the issue
   - Add appropriate labels

2. **Create Feature Branch**
   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/issue-{number}-{description}
   ```

3. **Make Changes**
   - Follow our [coding standards](#coding-standards)
   - Write tests for new functionality
   - Ensure responsive design
   - Maintain accessibility standards

4. **Test Your Changes**
   ```bash
   npm run dev
   npm run lint
   npm run build
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: implement drag and drop reordering (closes #5)"
   ```

6. **Push and Create Pull Request**
   ```bash
   git push origin feature/issue-5-drag-drop-reordering
   ```

### 4. Pull Request Process

1. **Create Pull Request**
   - Use the PR template
   - Reference the issue: "Closes #5"
   - Include screenshots for UI changes
   - Add detailed description of changes

2. **Code Review**
   - All PRs require review before merging
   - **Code owners are automatically assigned** via CODEOWNERS file
   - **GitHub Copilot provides automated analysis** when available
   - Request additional human reviewers as needed
   - Address feedback promptly
   - Ensure all checks pass

3. **Merge and Cleanup**
   - Squash and merge when approved
   - Delete feature branch after merge
   - Verify deployment if applicable

## 🎨 Design Guidelines

### Visual Design
- **Color Palette:** Neutral light colors (light grays, off-whites, subtle warm tones)
- **Typography:** Dark classical fonts for headlines, elegant sans-serif for body text
- **Spacing:** Consistent spacing using CSS custom properties
- **Shadows:** Subtle box-shadows for depth
- **Animations:** Smooth transitions (300ms ease-in-out)

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (desktop)
- Touch-friendly interactions (44px minimum touch targets)
- Flexible layouts using CSS Grid and Flexbox

## 🔧 Coding Standards

### React Components
- Use functional components with hooks
- Follow the single responsibility principle
- Use meaningful component and prop names
- Implement proper error boundaries

### File Structure
```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── utils/              # Utility functions
└── assets/             # Static assets
```

### CSS Guidelines
- Use CSS Modules or styled-components
- Follow BEM methodology for class names
- Use CSS custom properties for theming
- Ensure proper contrast ratios (WCAG AA)

### JavaScript Standards
- Use ES6+ features
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for complex functions

## 🧪 Testing

### Running Tests
```bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Testing Guidelines
- Write unit tests for all utility functions
- Test React components with React Testing Library
- Ensure accessibility testing
- Maintain minimum 80% code coverage
- Focus on testing behavior, not implementation details
- Use test data and fixtures instead of production data

### Testing Architecture
- **Framework**: Vitest (fast, Vite-native testing framework)
- **Component Testing**: React Testing Library for DOM testing
- **Environment**: JSDOM for browser API simulation
- **Coverage**: V8 provider with HTML/JSON reporting
- **Utilities**: Custom test setup with mocks for browser APIs

### Best Practices
- Write tests before implementing features (TDD)
- Use descriptive test names (given/when/then format)
- Group related tests with nested describes
- Mock external dependencies and services
- Test edge cases and error handling
- Avoid testing third-party libraries
- Write integration tests for critical user flows

### CI/CD Pipeline
- All tests run automatically on pull requests
- GitHub Actions workflow enforces quality gates:
  - All tests must pass
  - Code coverage must be at least 80%
  - ESLint checks must pass
  - Build must succeed
- Failed checks block merging
- Coverage reports are generated and published
- Codecov integration for coverage visualization

## 📦 Building and Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Linting and Formatting
```bash
npm run lint
npm run lint:fix
npm run format
```

## 📝 Commit Standards

### Conventional Commits (STRICT)
All commits **MUST** follow the [Conventional Commits](https://www.conventionalcommits.org/) specification **without emojis**:

#### Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, missing semi colons, etc)
- **refactor**: Code refactoring without functional changes
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes
- **perf**: Performance improvements
- **ci**: CI/CD configuration changes
- **build**: Build system changes
- **revert**: Reverting previous commits

#### Examples
```bash
# ✅ GOOD - Clean conventional commits
feat: add drag and drop functionality
fix: resolve save indicator timing issue
docs: update README with deployment instructions
feat!: redesign todo data structure

# ❌ BAD - Emoji prefixes not allowed
✨ feat: add dark mode support
🐛 fix: resolve timing issue
📝 docs: update README
✨ Update app title to "Executive Manager"
```

#### Breaking Changes
Use `!` after the type/scope to indicate breaking changes:
```bash
feat!: remove legacy API endpoints
fix(api)!: change response format
```

### Commit Process
1. **Stage your changes**: `git add .`
2. **Write conventional commit**: `git commit -m "feat: add new feature"`
3. **Validate locally**: Our pre-commit hooks will validate your commit message
4. **Push to feature branch**: `git push origin feature/your-branch`

## 🤝 Getting Help

- **Issues:** Check existing issues or create new ones
- **Discussions:** Use GitHub Discussions for questions
- **Code Review:** Tag reviewers in PRs
- **Documentation:** Refer to this guide and inline comments

## 📋 Checklist for Contributors

Before submitting a PR, ensure:

- [ ] Issue exists and is assigned to you
- [ ] Feature branch created with proper naming
- [ ] Code follows our style guidelines
- [ ] Tests pass and coverage is maintained
- [ ] Documentation is updated if needed
- [ ] UI changes are responsive and accessible
- [ ] Screenshots included for visual changes
- [ ] PR description references the issue

## 🎯 Current Priority Issues

Check our [GitHub Issues](https://github.com/StargrrlMoonlight/SettingUpMcpServers/issues) for:
- 📅 Due Dates and Priority Levels (#3)
- 🏷️ Task Categories and Tags (#2)
- 🎯 Drag and Drop Reordering (#5)

Thank you for contributing to our React Todo List project! 🚀
