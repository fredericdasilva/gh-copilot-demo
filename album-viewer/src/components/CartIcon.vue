<template>
  <div class="cart-icon" @click="toggleDrawer">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke-width="1.5" 
      stroke="currentColor" 
      class="cart-svg"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" 
      />
    </svg>
    <span v-if="totalItems > 0" class="badge">{{ totalItems }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'

const emit = defineEmits<{
  toggleDrawer: []
}>()

const cartStore = useCartStore()
const totalItems = computed(() => cartStore.totalItems)

const toggleDrawer = (): void => {
  emit('toggleDrawer')
}
</script>

<style scoped>
.cart-icon {
  position: relative;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-icon:hover {
  transform: scale(1.1);
}

.cart-svg {
  width: 32px;
  height: 32px;
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
