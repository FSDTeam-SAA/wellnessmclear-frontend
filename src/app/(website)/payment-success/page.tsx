import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen mt-[-100px] lg:mt-[-200px] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <CheckCircle2 className="text-green-500 mx-auto w-16 h-16 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Payment Successful</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase! Your payment was processed successfully.</p>
        <Link href="/">
          <Button className="w-full">Go to Homepage</Button>
        </Link>
      </div>
    </div>
  )
}

export default page