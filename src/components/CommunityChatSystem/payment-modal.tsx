"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { useState, useEffect } from "react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onPayment: () => void
  onPaymentSuccess?: () => void
  isLoading: boolean
}

export function PaymentModal({ isOpen, onClose, onPayment, onPaymentSuccess, isLoading }: PaymentModalProps) {
  const [isAnnual, setIsAnnual] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")

  // Listen for payment success (this would typically come from a webhook or redirect)
  useEffect(() => {
    const handlePaymentComplete = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return

      if (event.data.type === "PAYMENT_SUCCESS") {
        setPaymentStatus("success")
        setTimeout(() => {
          onPaymentSuccess?.()
          onClose()
        }, 2000)
      } else if (event.data.type === "PAYMENT_ERROR") {
        setPaymentStatus("error")
      }
    }

    window.addEventListener("message", handlePaymentComplete)
    return () => window.removeEventListener("message", handlePaymentComplete)
  }, [onPaymentSuccess, onClose])

  const handlePayment = () => {
    setPaymentStatus("processing")
    onPayment()
  }

  const getButtonContent = () => {
    switch (paymentStatus) {
      case "processing":
        return "Processing Payment..."
      case "success":
        return "Payment Successful! ✓"
      case "error":
        return "Payment Failed - Try Again"
      default:
        return isLoading ? "Processing..." : "Unlock Private Community"
    }
  }

  const getButtonClassName = () => {
    const baseClass = "w-full py-4 text-lg font-semibold mb-8 rounded-lg transition-colors"

    switch (paymentStatus) {
      case "success":
        return `${baseClass} bg-green-600 text-white cursor-default`
      case "error":
        return `${baseClass} bg-red-600 hover:bg-red-700 text-white`
      default:
        return `${baseClass} bg-green-600 hover:bg-green-700 text-white`
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="text-orange-500 text-sm mb-2 font-medium">Get more from your Information Platform</div>
            <div className="text-3xl font-bold text-gray-900 mb-1">Get Started,</div>
            <div className="text-3xl font-bold text-gray-900">For When You Want More</div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isAnnual ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-12 h-6 bg-blue-500 rounded-full transition-colors"
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  isAnnual ? "translate-x-6" : "translate-x-0.5"
                }`}
              ></div>
            </button>
            <span className={`text-sm ${isAnnual ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              Annual Billing
            </span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">Save 20%</span>
          </div>

          {/* Pricing Card */}
          <Card className="border-2 border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-400 to-purple-500 text-white text-center rounded-t-lg">
              <CardTitle className="text-xl font-semibold">Private Community</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Preventive measures, such as regular medical check-ups and vaccinations, help detect and avoid
                  potential health issues early. Mental health is just as crucial as physical health, and managing
                  stress, building strong relationships, and seeking help
                </p>
                <div className="text-5xl font-bold text-green-600 mb-2">
                  ${isAnnual ? "19" : "228"}
                  <span className="text-lg text-gray-500 font-normal">/{isAnnual ? "year" : "month"}</span>
                </div>
                {isAnnual && (
                  <>
                    <div className="text-green-600 text-sm font-medium mb-1">Save 20%</div>
                    <div className="text-gray-500 text-sm">Billed annually</div>
                  </>
                )}
              </div>

              <Button
                onClick={handlePayment}
                disabled={isLoading || paymentStatus === "processing" || paymentStatus === "success"}
                className={getButtonClassName()}
              >
                {getButtonContent()}
              </Button>

              {paymentStatus === "success" && (
                <div className="text-center text-green-600 text-sm mb-4">
                  🎉 Welcome to the Private Community! Redirecting...
                </div>
              )}

              {paymentStatus === "error" && (
                <div className="text-center text-red-600 text-sm mb-4">
                  ❌ Payment failed. Please try again or contact support.
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-semibold text-lg text-gray-900">Unlock premium features</h3>
              </div>

              {/* Core Features */}
              <div className="mb-8">
                <h4 className="font-semibold text-sm mb-4 text-gray-900 tracking-wide">CORE FEATURES</h4>
                <div className="space-y-3">
                  {[
                    "Health is one of the most important",
                    "Health is one of the most important",
                    "Health is one of the most important",
                    "Health is one of the most important",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Premium Features */}
              <div>
                <h4 className="font-semibold text-sm mb-4 text-blue-600 tracking-wide">PREMIUM FEATURES</h4>
                <div className="space-y-3">
                  {[
                    "Preventive measures, such as regular",
                    "Preventive measures, such as regular",
                    "Preventive measures, such as regular",
                    "Preventive measures, such as regular",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <X className="h-3 w-3 text-red-500" />
                      </div>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
