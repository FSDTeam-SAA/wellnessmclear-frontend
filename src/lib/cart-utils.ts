import type { CartItem, Product, CartSummary } from "./types"

export const getCartItems = (): CartItem[] => {
  if (typeof window === "undefined") return []
  const items = localStorage.getItem("cart")
  return items ? JSON.parse(items) : []
}

export const saveCartItems = (items: CartItem[]): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("cart", JSON.stringify(items))
}

export const addToCart = (product: Product): void => {
  const cartItems = getCartItems()
  const existingItem = cartItems.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cartItems.push({ ...product, quantity: 1 })
  }

  saveCartItems(cartItems)
}

export const updateCartItemQuantity = (id: string, quantity: number): void => {
  const cartItems = getCartItems()
  const item = cartItems.find((item) => item.id === id)

  if (item) {
    if (quantity <= 0) {
      removeFromCart(id)
    } else {
      item.quantity = quantity
      saveCartItems(cartItems)
    }
  }
}

export const removeFromCart = (id: string): void => {
  const cartItems = getCartItems()
  const filteredItems = cartItems.filter((item) => item.id !== id)
  saveCartItems(filteredItems)
}

export const getCartSummary = (items: CartItem[]): CartSummary => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = 0 // No tax in this example
  const discount = 0 // No discount in this example
  const shippingCharge = 0 // Free shipping
  const total = subtotal + tax + shippingCharge - discount

  return {
    subtotal,
    tax,
    discount,
    shippingCharge,
    total,
  }
}

export const clearCart = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("cart")
}
