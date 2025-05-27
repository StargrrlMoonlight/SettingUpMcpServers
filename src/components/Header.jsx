import './Header.css'
import { useTheme } from '../contexts/ThemeContext'

function Header() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <header className="header">
      <div className="header-content">
        <div>
          <h1 className="header-title">Executive Tasks</h1>
          <p className="header-subtitle">Streamline your productivity with elegance</p>
        </div>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme} 
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}

export default Header
