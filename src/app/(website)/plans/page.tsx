"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Check, X, Info } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PlansPage() {
  const router = useRouter()
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      id: "public",
      name: "Public Community",
      description:
        "Health is one of the most important aspects of life, as it affects every part of our daily routine and long-term well-being. Maintaining good health involves a balanced diet, regular physical activity, sufficient sleep, and proper mental care",
      monthlyPrice: 200,
      annualPrice: 1920, // 20% discount
      features: [
        "Health is one of the most important",
        "Health is one of the most important",
        "Health is one of the most important",
        "Health is one of the most important",
      ],
      premiumFeatures: [
        "Preventive measures, such as regular",
        "Preventive measures, such as regular",
        "Preventive measures, such as regular",
        "Preventive measures, such as regular",
      ],
      popular: false,
      userLimit: "500 People",
    },
    {
      id: "private",
      name: "Private Community",
      description:
        "Preventive measures, such as regular medical check-ups and vaccinations, help detect and avoid potential health issues early. Mental health is just as crucial as physical health, and managing stress, building strong relationships, and seeking help",
      monthlyPrice: 800,
      annualPrice: 6400, // 20% discount
      features: [
        "Health is one of the most important",
        "Health is one of the most important",
        "Health is one of the most important",
        "Health is one of the most important",
      ],
      premiumFeatures: [
        "Preventive measures, such as regular",
        "Preventive measures, such as regular",
        "Preventive measures, such as regular",
        "Preventive measures, such as regular",
      ],
      popular: true,
      userLimit: "Unlimited People",
    },
  ]

  const handlePlanSelect = (planId: string) => {
    const plan = plans.find((p) => p.id === planId)
    if (!plan) return

    const planData = {
      planId,
      planName: plan.name,
      billingType: isAnnual ? "annual" : "monthly",
      price: isAnnual ? plan.annualPrice : plan.monthlyPrice,
      originalPrice: isAnnual ? plan.monthlyPrice * 12 : plan.monthlyPrice,
      discount: isAnnual ? plan.monthlyPrice * 12 - plan.annualPrice : 0,
      userLimit: plan.userLimit,
    }

    console.log("Selected Plan Data:", planData)

    // Store plan data for payment page
    localStorage.setItem("selectedPlan", JSON.stringify(planData))

    // Navigate to payment page
    router.push("/payment")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              WMC
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900">
                HOME
              </Link>
              <Link href="/shop" className="text-gray-700 hover:text-gray-900">
                SHOP
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-gray-900">
                BLOG
              </Link>
              <Link href="/community" className="text-gray-700 hover:text-gray-900">
                COMMUNITY
              </Link>
              <Link href="/" className="text-gray-900 font-medium">
                FIND A COACH
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-orange-500 text-sm mb-2">Get more from your information Platform</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Get Started,</h1>
          <h2 className="text-4xl font-bold text-gray-900 mb-8">For When You Want More</h2>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${!isAnnual ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              Monthly Billing
            </span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} className="data-[state=checked]:bg-blue-600" />
            <span className={`text-sm ${isAnnual ? "text-gray-900 font-medium" : "text-gray-500"}`}>
              Annual Billing
            </span>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Save 20% <Info className="h-3 w-3 ml-1" />
            </Badge>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.popular ? "ring-2 ring-purple-500 bg-purple-50" : "bg-white"} hover:shadow-lg transition-shadow`}
            >
              <CardHeader className="text-center pb-4">
                <CardTitle className={`text-2xl ${plan.popular ? "text-purple-700" : "text-gray-700"}`}>
                  {plan.name}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-4 leading-relaxed">{plan.description}</p>
                <p className="text-blue-600 text-sm mt-4">Perfect for You with {plan.userLimit}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Pricing */}
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-green-600">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-500">/{isAnnual ? "year" : "month"}</span>
                  </div>
                  {isAnnual && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 mt-2">
                      Save 20%
                    </Badge>
                  )}
                  <p className="text-sm text-gray-500 mt-2">billed annually</p>
                </div>

                {/* Get Started Button */}
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handlePlanSelect(plan.id)}>
                  Get started
                </Button>

                {plan.id === "public" && <p className="text-center text-sm text-gray-600">Credit card required</p>}

                {plan.id === "private" && <p className="text-center text-sm font-medium">Unlock premium features</p>}

                {/* Core Features */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">CORE FEATURES</h4>
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Premium Features */}
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3">PREMIUM FEATURES</h4>
                  <div className="space-y-2">
                    {plan.premiumFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        {plan.id === "private" ? (
                          <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        )}
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
