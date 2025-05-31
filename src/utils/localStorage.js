/**
 * Utility functions for localStorage management
 */

export const STORAGE_KEYS = {
  TODOS: 'executive-tasks-todos',
  THEME: 'executive-tasks-theme',
  FILTERS: 'executive-tasks-filters'
}

/**
 * Get data from localStorage with fallback
 */
export const getStoredData = (key, fallback) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch (error) {
    console.warn(`Error parsing localStorage item ${key}:`, error)
    return fallback
  }
}

/**
 * Set data in localStorage
 */
export const setStoredData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`Error storing data to localStorage ${key}:`, error)
  }
}

/**
 * Clear all application data from localStorage
 */
export const clearAllData = () => {
  localStorage.clear()
  console.log('All application data cleared from localStorage')
}

/**
 * Export all application data for backup
 */
export const exportData = () => {
  const data = {}
  Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
    const item = localStorage.getItem(key)
    if (item) {
      try {
        data[name.toLowerCase()] = JSON.parse(item)
      } catch (error) {
        console.warn(`Error parsing ${key}:`, error)
      }
    }
  })
  return data
}

/**
 * Import application data from backup
 */
export const importData = (data) => {
  Object.entries(data).forEach(([name, value]) => {
    const key = STORAGE_KEYS[name.toUpperCase()]
    if (key) {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.warn(`Error importing ${key}:`, error)
      }
    }
  })
  console.log('Data imported successfully. Please refresh the page.')
}
