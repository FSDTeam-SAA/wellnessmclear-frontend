export interface Product {
  id: string
  name: string
  price: number
  image: string
  description?: string
  category?: string
  rating?: number
  reviews?: number
  isFavorite?: boolean
  stock?: number
  createdAt?: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface CartSummary {
  subtotal: number
  tax: number
  discount: number
  shippingCharge: number
  total: number
}
