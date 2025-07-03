"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Lock, Search, Globe } from "lucide-react"
import Link from "next/link"

export default function PaymentPage() {
  const [appointmentData, setAppointmentData] = useState<any>(null)
  const [coachData, setCoachData] = useState<any>(null)

  const [paymentData, setPaymentData] = useState({
    paymentMethod: "credit-card",
    country: "US",
    zipCode: "",
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    address: "",
    agreeToTerms: false,
  })

  useEffect(() => {
    const storedAppointment = localStorage.getItem("appointmentData")
    const storedCoach = localStorage.getItem("coachData")

    if (storedAppointment) setAppointmentData(JSON.parse(storedAppointment))
    if (storedCoach) setCoachData(JSON.parse(storedCoach))
  }, [])

  const handleInputChange = (field: string, value: string | boolean) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = () => {
    const completeData = {
      bookingFormData: appointmentData,
      paymentFormData: paymentData,
      coachData,
      totalAmount: total,
      timestamp: new Date().toISOString(),
    }

    console.log("=== COMPLETE BOOKING & PAYMENT DATA ===")
    console.log("Booking Form Data:", appointmentData)
    console.log("Payment Form Data:", paymentData)
    console.log("Coach Data:", coachData)
    console.log("Complete Combined Data:", completeData)

    alert("Payment processed successfully! Check console for all booking and payment data.")
  }

  if (!coachData || !appointmentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading payment information...</p>
          <Link href="/">
            <Button>Go to Coaches</Button>
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = coachData.price || 150
  const discount = subtotal * 0.1 // 10% discount
  const total = subtotal - discount

  return (
    <div className="min-h-screen bg-gray-50">
   
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Pricing Summary */}
        <div className="bg-white rounded-lg p-8 mb-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Subtotal:</span>
              <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Discount:</span>
              <span className="text-gray-900 font-medium">${discount.toFixed(2)}</span>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center">
              <span className="text-gray-900 font-semibold">Total:</span>
              <span className="text-gray-900 font-semibold">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Payment Method</h2>
            <p className="text-gray-600">Choose how you would complete your payment</p>
          </div>

          <div className="space-y-6">
            {/* Payment Method Selection */}
            <RadioGroup
              value={paymentData.paymentMethod}
              onValueChange={(value) => handleInputChange("paymentMethod", value)}
            >
              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                <RadioGroupItem value="credit-card" id="credit-card" className="text-blue-600" />
                <Label htmlFor="credit-card" className="flex items-center gap-3 flex-1 cursor-pointer">
                  <span className="text-gray-900 font-medium">Credit/Debit Card</span>
                </Label>
                <div className="flex gap-2">
                  <div className="px-2 py-1 bg-blue-600 rounded text-white text-xs font-bold">VISA</div>
                  <div className="px-2 py-1 bg-red-600 rounded text-white text-xs font-bold">MC</div>
                </div>
              </div>
            </RadioGroup>

            {/* Country and Zip Code */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country" className="text-gray-900 font-medium mb-2 block">
                  Country
                </Label>
                <Select value={paymentData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger className="h-12">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States, Canada</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="DE">Germany</SelectItem>
                    <SelectItem value="FR">France</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="zipCode" className="text-gray-900 font-medium mb-2 block">
                  Zip Code
                </Label>
                <Input
                  id="zipCode"
                  placeholder="0000"
                  className="h-12"
                  value={paymentData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                />
              </div>
            </div>

            {/* Name on Card */}
            <div>
              <Label htmlFor="nameOnCard" className="text-gray-900 font-medium mb-2 block">
                Name on card
              </Label>
              <Input
                id="nameOnCard"
                placeholder="Required"
                className="h-12"
                value={paymentData.nameOnCard}
                onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
              />
            </div>

            {/* Credit Card Number */}
            <div>
              <Label htmlFor="cardNumber" className="text-gray-900 font-medium mb-2 block">
                Credit card number
              </Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="0000-0000-0000-0000"
                  className="h-12 pr-10"
                  value={paymentData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                />
                <Lock className="absolute right-3 top-4 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Expiry Date */}
            <div>
              <Label htmlFor="expiryDate" className="text-gray-900 font-medium mb-2 block">
                Expire date
              </Label>
              <Input
                id="expiryDate"
                placeholder="DD/mm/yy"
                className="h-12"
                value={paymentData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              />
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address" className="text-gray-900 font-medium mb-2 block">
                Address
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                <Input
                  id="address"
                  placeholder=""
                  className="h-12 pl-10"
                  value={paymentData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center space-x-3 pt-4">
              <Checkbox
                id="terms"
                checked={paymentData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
              />
              <Label htmlFor="terms" className="text-gray-700 cursor-pointer">
                Agree with shipping & billing address
              </Label>
            </div>

            {/* Payment Button */}
            <Button
              className="w-full h-14 bg-green-500 hover:bg-green-600 text-white font-medium text-lg mt-8"
              onClick={handlePayment}
              disabled={!paymentData.agreeToTerms}
            >
              <Lock className="h-5 w-5 mr-2" />
              Make Your Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
