# Testing Framework Guide

This document covers the comprehensive testing framework used to ensure code quality and prevent regressions in the React Todo List project, integrated with our advanced dual-flow CI/CD pipeline.

## 🧪 Testing Technology Stack

- **Vitest**: Fast, Vite-native testing framework optimized for our workflow
- **React Testing Library**: For testing React components with accessibility focus
- **JSDOM**: Browser environment simulation for comprehensive testing
- **@testing-library/user-event**: For simulating realistic user interactions
- **Codecov**: Coverage reporting with automatic badge updates in README

## 🚀 Integration with Dual-Flow CI/CD

Our testing framework is optimized for the advanced workflow architecture:

### Flow 1: Pull Request Testing (Fast Feedback)
- **Purpose**: Immediate developer feedback on code quality
- **Tests Run**: All unit tests, integration tests, and accessibility checks
- **Performance**: ~60% faster execution through smart caching
- **Coverage**: Real-time coverage reporting without deployment overhead

### Flow 2: Production Pipeline Testing
- **Purpose**: Comprehensive validation before deployment
- **Tests Run**: Full test suite with coverage reporting and badge updates
- **Integration**: Seamless integration with build and deployment processes
- **Safeguards**: Part of the 7-layer protection system

## 📁 Test Structure

- **Unit Tests**: Located alongside source files (e.g., `Component.test.jsx`)
- **Integration Tests**: Located in `src/test` directory
- **Test Setup**: Global setup in `src/test/setup.js`
- **Mocks**: Browser APIs mocked in setup file

### Test File Organization
```
src/
├── components/
│   ├── AddTodo.jsx
│   ├── AddTodo.test.jsx          # Component unit tests
│   ├── TodoItem.jsx
│   └── TodoItem.test.jsx
├── hooks/
│   ├── useLocalStorage.js
│   └── useLocalStorage.test.js   # Hook unit tests
├── utils/
│   ├── localStorage.js
│   └── localStorage.test.js      # Utility unit tests
└── test/
    ├── App.test.jsx              # Integration tests
    ├── main.test.jsx
    └── setup.js                  # Global test configuration
```

## 🚀 Running Tests

### Basic Commands
```bash
# Run all tests
npm run test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage reporting
npm run test:coverage

# Run tests in CI mode (single run)
npm run test:ci

# Run a specific test file
npm run test -- TodoItem.test.jsx

# Run tests matching a pattern
npm run test -- --grep "should render"
```

### Watch Mode Features
- **Automatic re-runs** when files change
- **Filter by file path** or test name
- **Interactive menu** for test selection
- **Real-time coverage updates**

## 📊 Coverage Requirements

### Minimum Thresholds
The project maintains a minimum of **80% code coverage** across:
- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

### Coverage Reports
- **HTML Report**: Generated in `coverage/` directory
- **View Report**: Open `coverage/index.html` in browser
- **JSON Reports**: `coverage-final.json` and `coverage-summary.json`
- **Badge Integration**: Coverage percentage displayed in README

### Coverage Analysis
```bash
# Generate and view coverage report
npm run test:coverage
open coverage/index.html
```

## ✅ Writing Tests

### Component Testing Best Practices
```jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import TodoItem from './TodoItem'

describe('TodoItem', () => {
  const mockTodo = {
    id: 1,
    text: 'Test todo',
    completed: false
  }

  it('should render todo text', () => {
    render(<TodoItem todo={mockTodo} />)
    expect(screen.getByText('Test todo')).toBeInTheDocument()
  })

  it('should handle completion toggle', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    
    render(<TodoItem todo={mockTodo} onToggle={onToggle} />)
    
    await user.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith(1)
  })
})
```

### Hook Testing
```javascript
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import useLocalStorage from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should return initial value', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'))
    expect(result.current[0]).toBe('initial')
  })

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initial'))
    
    act(() => {
      result.current[1]('updated')
    })
    
    expect(localStorage.getItem('test')).toBe('"updated"')
  })
})
```

### Utility Testing
```javascript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { saveToStorage, loadFromStorage } from './localStorage'

describe('localStorage utilities', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should save data to localStorage', () => {
    const data = { test: 'value' }
    saveToStorage('key', data)
    
    expect(localStorage.getItem('key')).toBe(JSON.stringify(data))
  })

  it('should handle localStorage errors gracefully', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage full')
    })
    
    expect(() => saveToStorage('key', 'value')).not.toThrow()
  })
})
```

## 🔧 CI/CD Integration

### Automated Testing Pipeline
Tests are automatically run on:
- **Pull request creation/updates**
- **Pushes to main branch**
- **Manual workflow dispatch**

### Pipeline Steps
1. **Linting**: ESLint checks code quality and style
2. **Type Checking**: TypeScript validation
3. **Unit Testing**: Runs all tests with coverage reporting
4. **Coverage Validation**: Verifies coverage meets 80% threshold
5. **Build Verification**: Ensures production build succeeds
6. **Accessibility Testing**: Runs axe-core checks on built application

### Multi-Version Testing
- **Node.js 18.x**: LTS version testing
- **Node.js 20.x**: Current stable version testing
- **Cross-platform**: Tests run on Ubuntu Linux

### Coverage Publishing
- **Codecov Integration**: Automatic coverage report uploads
- **PR Comments**: Coverage diff reports on pull requests
- **README Badge**: Live coverage percentage display
- **Trend Tracking**: Coverage history and trend analysis

## 🐛 Debugging Tests

### Common Issues
```bash
# Clear test cache
npm run test:coverage -- --clearCache

# Run tests with verbose output
npm run test -- --reporter=verbose

# Debug specific test
npm run test -- --grep "failing test name" --reporter=verbose
```

### Test Environment
- **JSDOM**: Simulates browser environment
- **LocalStorage Mock**: Available in all tests
- **Console Suppression**: Reduces noise during test runs
- **Async Testing**: Full support for promises and async/await

### IDE Integration
- **VS Code**: Jest/Vitest extension for inline test running
- **Debugging**: Breakpoint support in VS Code
- **Auto-completion**: Full IntelliSense for testing utilities

## 📚 Testing Resources

### Documentation
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library User Events](https://testing-library.com/docs/user-event/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

### Best Practices
- **Test behavior, not implementation**
- **Use semantic queries** (getByRole, getByLabelText)
- **Test user interactions** with userEvent
- **Mock external dependencies** appropriately
- **Keep tests focused and isolated**
- **Use descriptive test names**

---

*This testing framework ensures code quality and prevents regressions while maintaining development velocity.*
