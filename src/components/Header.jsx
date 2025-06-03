import './Header.css'
import { useTheme } from '../contexts/ThemeContext'

function Header() {
  const { theme, cycleTheme } = useTheme()

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return '☀️'
      case 'dark': return '🌙'
      case 'vibe': return '🌈'
      default: return '☀️'
    }
  }

  const getNextTheme = () => {
    switch (theme) {
      case 'light': return 'dark'
      case 'dark': return 'vibe'
      case 'vibe': return 'light'
      default: return 'dark'
    }
  }

  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1 className="header-title">Executive Manager</h1>
          <p className="header-subtitle">Streamline your productivity with elegance</p>
        </div>
        <button
          className="theme-toggle"
          onClick={cycleTheme}
          aria-label={`Current: ${theme} theme. Click to switch to ${getNextTheme()}`}
          title={`Current: ${theme} theme. Click to switch to ${getNextTheme()}`}
        >
          {getThemeIcon()}
        </button>
      </div>
    </header>
  )
}

export default Header
