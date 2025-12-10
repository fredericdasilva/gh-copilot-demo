<template>
  <div class="album-card">
    <div class="album-image">
      <img 
        :src="album.image_url" 
        :alt="album.title"
        @error="handleImageError"
        loading="lazy"
      />
      <div class="play-overlay">
        <div class="play-button">▶</div>
      </div>
    </div>
    
    <div class="album-info">
      <h3 class="album-title">{{ album.title }}</h3>
      <p class="album-artist">{{ album.artist }}</p>
      <div class="album-price">
        <span class="price">${{ album.price.toFixed(2) }}</span>
      </div>
    </div>
    
    <div class="album-actions">
      <button class="btn btn-primary">Add to Cart</button>
      <button class="btn btn-secondary">Preview</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Album } from '../types/album'

interface Props {
  album: Album
}

defineProps<Props>()

const handleImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/300x300/667eea/white?text=Album+Cover'
}
</script>

<style scoped>
.album-card {
  background: var(--bg-secondary);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.album-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-lg);
}

.album-image {
  position: relative;
  overflow: hidden;
}

.album-image img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.album-card:hover .album-image img {
  transform: scale(1.1);
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.album-card:hover .play-overlay {
  opacity: 1;
}

.play-button {
  width: 60px;
  height: 60px;
  background: var(--play-btn-bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--play-btn-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.play-button:hover {
  background: var(--play-btn-hover-bg);
  transform: scale(1.1);
}

.album-info {
  padding: 1.5rem;
}

.album-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.album-artist {
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0 0 1rem 0;
}

.album-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent-primary);
}

.album-actions {
  padding: 0 1.5rem 1.5rem;
  display: flex;
  gap: 0.75rem;
}

.btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}

.btn-primary:hover {
  background: var(--btn-primary-hover);
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
  border: 2px solid var(--border-solid);
}

.btn-secondary:hover {
  background: var(--btn-secondary-hover);
  color: var(--btn-secondary-hover-text);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .album-info {
    padding: 1rem;
  }
  
  .album-actions {
    padding: 0 1rem 1rem;
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
