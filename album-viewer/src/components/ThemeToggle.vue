<template>
  <button 
    @click="toggleTheme" 
    class="theme-toggle"
    :aria-label="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
    :title="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
  >
    <svg 
      v-if="theme === 'light'" 
      class="icon moon-icon" 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
    <svg 
      v-else 
      class="icon sun-icon" 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-toggle {
  background: var(--theme-toggle-bg);
  border: 2px solid var(--theme-toggle-border);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  color: var(--theme-toggle-color);
}

.theme-toggle:hover {
  background: var(--theme-toggle-hover-bg);
  transform: scale(1.1);
  box-shadow: 0 4px 12px var(--theme-toggle-shadow);
}

.icon {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.sun-icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

.moon-icon {
  fill: currentColor;
}

.theme-toggle:hover .icon {
  transform: rotate(20deg);
}

@media (max-width: 768px) {
  .theme-toggle {
    width: 40px;
    height: 40px;
  }
  
  .icon {
    width: 20px;
    height: 20px;
  }
}
</style>
