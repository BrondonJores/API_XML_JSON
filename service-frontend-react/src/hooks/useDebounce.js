import { useState, useEffect } from 'react'
import { DEBOUNCE_DELAY } from '../utils/constants'

/**
 * Hook personnalisé pour debounce
 * @param {any} value - Valeur à debouncer
 * @param {number} delay - Délai en ms
 * @returns {any} Valeur debouncée
 */
const useDebounce = (value, delay = DEBOUNCE_DELAY) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
