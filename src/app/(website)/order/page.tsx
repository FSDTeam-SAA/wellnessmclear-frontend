import React from 'react'
import OrderPage from './_components/OrderPage'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'


async function   page () {
  const loingin =  await  auth()
  if (!loingin) {
   redirect('/login')
  }
  return (
    <div>
        <OrderPage />
    </div>
  )
}

export default page