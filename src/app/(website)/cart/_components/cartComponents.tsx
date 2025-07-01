"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CartItem, CartSummary } from "@/lib/types"
import { getCartItems, updateCartItemQuantity, removeFromCart, getCartSummary } from "@/lib/cart-utils"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartSummary, setCartSummary] = useState<CartSummary>({
    subtotal: 0,
    tax: 0,
    discount: 0,
    shippingCharge: 0,
    total: 0,
  })

  useEffect(() => {
    const items = getCartItems()
    setCartItems(items)
    setCartSummary(getCartSummary(items))
  }, [])

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateCartItemQuantity(id, newQuantity)
    const updatedItems = getCartItems()
    setCartItems(updatedItems)
    setCartSummary(getCartSummary(updatedItems))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const handleRemoveItem = (id: string) => {
    removeFromCart(id)
    const updatedItems = getCartItems()
    setCartItems(updatedItems)
    setCartSummary(getCartSummary(updatedItems))
    window.dispatchEvent(new Event("cartUpdated"))
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <Header /> */}
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700">Continue Shopping</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Cart Page</h1>
          <p className="text-gray-600">
            From here you can access to the shopping basket, ordering and purchasing shopping experience with
            information about, delivery and customer comments, quality and value of products.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 bg-gray-50 border-b font-semibold">
            <div className="col-span-6">Products</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Remove</div>
          </div>

          {/* Cart Items */}
          <div className="divide-y">
            {cartItems.map((item) => (
              <div key={item.id} className="p-4">
                {/* Desktop Layout */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center space-x-4">
                    <div className="w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="rounded"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">Price: ${item.price}</p>
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="col-span-2 text-center font-semibold">${(item.price * item.quantity).toFixed(2)}</div>

                  <div className="col-span-2 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">Price: ${item.price}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          <div className="lg:flex-1">
            <Link href="/">
              <Button variant="outline" className="bg-green-100 text-green-700 border-green-300 hover:bg-green-200">
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="lg:w-80">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Card details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${cartSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${cartSummary.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>${cartSummary.total.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Checkout</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
