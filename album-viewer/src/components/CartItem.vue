<template>
  <div class="cart-item">
    <div class="item-image">
      <img :src="item.album.image_url" :alt="item.album.title" @error="handleImageError" />
    </div>
    <div class="item-details">
      <h4 class="item-title">{{ item.album.title }}</h4>
      <p class="item-artist">{{ item.album.artist }}</p>
      <div class="item-price-quantity">
        <span class="item-price">${{ item.album.price.toFixed(2) }}</span>
        <span v-if="item.quantity > 1" class="item-quantity">x{{ item.quantity }}</span>
      </div>
    </div>
    <button class="remove-btn" @click="handleRemove" aria-label="Remove from cart">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke-width="1.5" 
        stroke="currentColor" 
        class="trash-icon"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" 
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '../types/cart'

interface Props {
  item: CartItem
}

const props = defineProps<Props>()

const emit = defineEmits<{
  remove: [albumId: number]
}>()

const handleRemove = (): void => {
  emit('remove', props.item.album.id)
}

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/80x80/667eea/white?text=Album'
}
</script>

<style scoped>
.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 0.75rem;
  transition: all 0.2s ease;
}

.cart-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.item-image {
  flex-shrink: 0;
}

.item-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-artist {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 0.5rem 0;
}

.item-price-quantity {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.item-price {
  font-size: 1rem;
  font-weight: bold;
  color: #60a5fa;
}

.item-quantity {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.remove-btn {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 0;
}

.remove-btn:hover {
  background: rgba(239, 68, 68, 0.2);
}

.trash-icon {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.2s ease;
}

.remove-btn:hover .trash-icon {
  color: #ef4444;
}
</style>
