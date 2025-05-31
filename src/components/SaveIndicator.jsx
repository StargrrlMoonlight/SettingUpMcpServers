import { useState, useEffect } from 'react'
import './SaveIndicator.css'

function SaveIndicator({ show, onHide }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onHide) {
          onHide()
        }
      }, 2000) // Show for 2 seconds

      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [show, onHide])

  if (!isVisible) return null

  return (
    <div className="save-indicator" role="status" aria-live="polite">
      <span className="save-icon">✓</span>
      <span className="save-text">Saved</span>
    </div>
  )
}

export default SaveIndicator
