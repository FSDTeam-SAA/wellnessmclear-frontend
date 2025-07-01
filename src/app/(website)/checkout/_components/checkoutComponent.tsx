"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { CartItem, CartSummary } from "@/lib/types";
import { getCartItems, getCartSummary, clearCart } from "@/lib/cart-utils";

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSummary, setCartSummary] = useState<CartSummary>({
    subtotal: 0,
    tax: 0,
    discount: 0,
    shippingCharge: 0,
    total: 0,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const [date, setDate] = useState("");
  // const [expiry, setExpiry] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Keep only digits

    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    if (value.length >= 5) {
      // Format as MM/DD/YYYY
      value =
        value.slice(0, 2) + "/" + value.slice(2, 4) + "/" + value.slice(4, 8);
    } else if (value.length >= 3) {
      // Format as MM/DD
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }

    setDate(value);
  };

  useEffect(() => {
    const items = getCartItems();
    if (items.length === 0) {
      router.push("/cart");
      return;
    }
    setCartItems(items);
    setCartSummary(getCartSummary(items));
  }, [router]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      window.dispatchEvent(new Event("cartUpdated"));
      alert("Payment successful! Thank you for your order.");
      router.push("/");
    }, 2000);
  };

  if (cartItems.length === 0) {
    return null; // Will redirect to cart page
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout Page</h1>
          <p className="text-gray-600">
            It can easily be used to the shopping basket, ordering and
            purchasing shopping experience with information about, delivery and
            customer comments, quality and value of products.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Price: ${item.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Qty: {item.quantity}</p>
                    <p className="text-sm text-gray-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${cartSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>${cartSummary.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Charge:</span>
                <span>${cartSummary.shippingCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>${cartSummary.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
            <p className="text-gray-600 mb-6">
              Choose how you want to complete your payment
            </p>

            <form onSubmit={handlePayment} className="space-y-6">
              <RadioGroup defaultValue="card" className="mb-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center space-x-2">
                    <span>Credit/Debit Card</span>
                    <div className="flex space-x-1">
                      <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        VISA
                      </div>
                      <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        MC
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="zipcode">Zip Code</Label>
                  <Input id="zipcode" placeholder="Enter zip code" required />
                </div>
              </div>

              <div>
                <Label htmlFor="cardname">Name on Card</Label>
                <Input
                  id="cardname"
                  placeholder="Enter name on card"
                  required
                />
              </div>

              <div>
                <Label htmlFor="cardnumber">Credit card number</Label>
                <Input
                  id="cardnumber"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>

              <div>
                <Label htmlFor="date">Date (MM/DD/YYYY)</Label>
                <Input
                  id="date"
                  name="date"
                  placeholder="MM/DD/YYYY"
                  value={date}
                  onChange={handleDateChange}
                  maxLength={10}
                  inputMode="numeric"
                  pattern="\d{2}/\d{2}/\d{4}"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter your address" required />
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-600 mb-4">
                  Agree with{" "}
                  <span className="text-blue-600 cursor-pointer">
                    shipping & billing policies
                  </span>
                </p>
                <Button
                  type="submit"
                  className="w-full bg-[#A8C2A3] text-white py-3"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing Payment..." : "Make Your Payment"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
