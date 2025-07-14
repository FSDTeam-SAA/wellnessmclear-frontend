"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { CartItem, CartSummary } from "@/lib/types";
import { getCartItems, getCartSummary } from "@/lib/cart-utils";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
type CheckoutBody = {
  type: "product" | "service";
  userId: string;
  itemDetails: {
    productId: string;
    quantity: number;
  }[];
  totalAmount: number;
};
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

  const session = useSession();
  const userId = session?.data?.user?.id;
  const TOKEN = session?.data?.user?.accessToken;
  // console.log(userId)

  useEffect(() => {
    const items = getCartItems();
    if (items.length === 0) {
      router.push("/cart");
      return;
    }
    setCartItems(items);
    setCartSummary(getCartSummary(items));
  }, [router]);

  const paymentMutation = useMutation({
    mutationFn: async (bodyData: CheckoutBody) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // assuming you're sending JSON data
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify(bodyData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to process payment");
      }

      return res.json(); // return parsed response
    },

    onError: (err) => {
      toast.error(err.message);
    },

    onSuccess: (data) => {
      toast.success(data.message);
      window.location.href = data.data.url
      // console.log('url', )
    },
  });

  const handleCheckout = () => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    const body: CheckoutBody = {
      type: "product",
      userId: userId,
      itemDetails: cartItems.map((item) => ({
        productId: item.id || "",
        quantity: item.quantity,
      })),
      totalAmount: cartSummary.total,
    };

    console.log("Checkout body:", body);
    paymentMutation.mutate(body);
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

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <button
              onClick={handleCheckout}
              disabled={paymentMutation.isPending}
              className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-lg transition-colors ${
                paymentMutation.isPending
                  ? "bg-[#789e70] hover:bg-[#A8C2A3] text-white"
                  : "bg-[#789e70] hover:bg-[#A8C2A3] text-white"
              }`}
            >
              {paymentMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  Processing...
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
