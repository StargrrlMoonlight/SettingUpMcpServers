import { useState, useEffect } from 'react'
import './SaveIndicator.css'

function SaveIndicator({ isVisible }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
      }, 2000) // Show for 2 seconds

      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!show) return null

  return (
    <div className="save-indicator">
      <span className="save-icon">✓</span>
      <span className="save-text">Saved</span>
    </div>
  )
}

export default SaveIndicator
