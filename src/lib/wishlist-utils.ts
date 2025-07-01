import type { Product } from "./types"

export const getWishlistItems = (): Product[] => {
  if (typeof window === "undefined") return []
  const items = localStorage.getItem("wishlist")
  return items ? JSON.parse(items) : []
}

export const saveWishlistItems = (items: Product[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("wishlist", JSON.stringify(items))
}

export const addToWishlist = (product: Product): void => {
  const wishlistItems = getWishlistItems()
  const existingItem = wishlistItems.find((item) => item.id === product.id)

  if (!existingItem) {
    wishlistItems.push(product)
    saveWishlistItems(wishlistItems)
  }
}

export const removeFromWishlist = (productId: string): void => {
  const wishlistItems = getWishlistItems()
  const filteredItems = wishlistItems.filter((item) => item.id !== productId)
  saveWishlistItems(filteredItems)
}

export const isInWishlist = (productId: string): boolean => {
  const wishlistItems = getWishlistItems()
  return wishlistItems.some((item) => item.id === productId)
}

export const toggleWishlist = (product: Product): boolean => {
  const inWishlist = isInWishlist(product.id)

  if (inWishlist) {
    removeFromWishlist(product.id)
    return false
  } else {
    addToWishlist(product)
    return true
  }
}

export const clearWishlist = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("wishlist")
}
