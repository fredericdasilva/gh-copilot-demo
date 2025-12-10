<template>
  <Teleport to="body">
    <Transition name="drawer-overlay">
      <div v-if="isOpen" class="drawer-overlay" @click="handleOverlayClick"></div>
    </Transition>
    
    <Transition name="drawer">
      <div v-if="isOpen" class="cart-drawer">
        <div class="drawer-header">
          <h2>Your Cart</h2>
          <button class="close-btn" @click="closeDrawer" aria-label="Close cart">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5" 
              stroke="currentColor" 
              class="close-icon"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="drawer-content">
          <div v-if="cartStore.items.length === 0" class="empty-cart">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5" 
              stroke="currentColor" 
              class="empty-icon"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" 
              />
            </svg>
            <p>Your cart is empty</p>
          </div>

          <div v-else class="cart-items">
            <CartItem 
              v-for="item in cartStore.items" 
              :key="item.album.id" 
              :item="item"
              @remove="handleRemoveItem"
            />
          </div>
        </div>

        <div v-if="cartStore.items.length > 0" class="drawer-footer">
          <div class="total-section">
            <span class="total-label">Total:</span>
            <span class="total-price">${{ cartStore.totalPrice.toFixed(2) }}</span>
          </div>
          <button class="clear-btn" @click="handleClearCart">
            Clear Cart
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { useCartStore } from '../stores/cart'
import CartItem from './CartItem.vue'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const cartStore = useCartStore()

const closeDrawer = (): void => {
  emit('close')
}

const handleOverlayClick = (): void => {
  closeDrawer()
}

const handleRemoveItem = (albumId: number): void => {
  cartStore.removeFromCart(albumId)
}

const handleClearCart = (): void => {
  if (confirm('Are you sure you want to clear your cart?')) {
    cartStore.clearCart()
  }
}

// Close drawer on escape key
let cleanupEscape: (() => void) | null = null

watch(() => props.isOpen, (isOpen) => {
  // Cleanup previous listener if it exists
  if (cleanupEscape) {
    cleanupEscape()
    cleanupEscape = null
  }

  if (isOpen) {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDrawer()
      }
    }
    document.addEventListener('keydown', handleEscape)
    
    cleanupEscape = () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }
})

// Cleanup on component unmount
onUnmounted(() => {
  if (cleanupEscape) {
    cleanupEscape()
  }
})
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 999;
}

.cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.drawer-header h2 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.close-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-cart p {
  font-size: 1.1rem;
  margin: 0;
}

.cart-items {
  display: flex;
  flex-direction: column;
}

.drawer-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.1);
}

.total-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.total-label {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
}

.total-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #60a5fa;
}

.clear-btn {
  width: 100%;
  padding: 0.75rem;
  background: rgba(239, 68, 68, 0.2);
  color: white;
  border: 1px solid rgba(239, 68, 68, 0.5);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: rgba(239, 68, 68, 0.3);
  border-color: rgba(239, 68, 68, 0.7);
}

/* Drawer transitions */
.drawer-overlay-enter-active,
.drawer-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-overlay-enter-from,
.drawer-overlay-leave-to {
  opacity: 0;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .cart-drawer {
    max-width: 100%;
  }
}
</style>
