// import type { Product } from "./types"

import { Product } from "@/types/productDataType"

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
  const existingItem = wishlistItems.find((item) => item._id === product._id)

  if (!existingItem) {
    wishlistItems.push(product)
    saveWishlistItems(wishlistItems)
  }
}

export const removeFromWishlist = (productId: string): void => {
  const wishlistItems = getWishlistItems()
  const filteredItems = wishlistItems.filter((item) => item._id !== productId)
  saveWishlistItems(filteredItems)
}

export const isInWishlist = (productId: string): boolean => {
  const wishlistItems = getWishlistItems()
  return wishlistItems.some((item) => item._id === productId)
}

export const toggleWishlist = (product: Product): boolean => {
  const inWishlist = isInWishlist(product._id)

  if (inWishlist) {
    removeFromWishlist(product._id)
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
