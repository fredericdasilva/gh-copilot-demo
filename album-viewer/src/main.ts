import { createApp } from 'vue'
import App from './App.vue'
import { useTheme } from './composables/useTheme'
import './styles/theme.css'

// Initialize theme before mounting the app
const { initializeTheme } = useTheme()
initializeTheme()

createApp(App).mount('#app')
