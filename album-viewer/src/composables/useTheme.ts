import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'album-viewer-theme'

// Global reactive theme state
const theme = ref<Theme>('light')

export function useTheme() {
  /**
   * Initialize theme based on:
   * 1. Stored preference in localStorage
   * 2. System preference (prefers-color-scheme)
   * 3. Default to light mode
   */
  const initializeTheme = (): void => {
    try {
      const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
      
      if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
        theme.value = storedTheme
      } else if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme.value = 'dark'
      } else {
        theme.value = 'light'
      }
    } catch (error) {
      // If localStorage access fails, fall back to system preference or light mode
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme.value = 'dark'
      } else {
        theme.value = 'light'
      }
    }
    
    applyTheme(theme.value)
  }

  /**
   * Apply the theme to the document
   */
  const applyTheme = (newTheme: Theme): void => {
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = (): void => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  // Watch for theme changes and persist to localStorage
  watch(theme, (newTheme) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    } catch (error) {
      // Silently fail if localStorage is unavailable
      console.warn('Failed to save theme preference to localStorage:', error)
    }
    applyTheme(newTheme)
  })

  return {
    theme,
    initializeTheme,
    toggleTheme
  }
}
