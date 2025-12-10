import { defineStore } from 'pinia'
import type { Album } from '../types/album'
import type { CartItem, CartState } from '../types/cart'

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: []
  }),

  getters: {
    totalItems: (state): number => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },

    totalPrice: (state): number => {
      return state.items.reduce(
        (total, item) => total + item.album.price * item.quantity,
        0
      )
    },

    isInCart: (state) => {
      return (albumId: number): boolean => {
        return state.items.some(item => item.album.id === albumId)
      }
    }
  },

  actions: {
    addToCart(album: Album): void {
      const existingItem = this.items.find(item => item.album.id === album.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          album,
          quantity: 1
        })
      }
    },

    removeFromCart(albumId: number): void {
      const index = this.items.findIndex(item => item.album.id === albumId)
      if (index > -1) {
        this.items.splice(index, 1)
      }
    },

    updateQuantity(albumId: number, quantity: number): void {
      const item = this.items.find(item => item.album.id === albumId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(albumId)
        } else {
          item.quantity = quantity
        }
      }
    },

    clearCart(): void {
      this.items = []
    }
  },

  persist: true
})
