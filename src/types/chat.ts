export type ChatTab = "public" | "private"

export interface User {
  _id: string
  id?: string
  firstName: string
  lastName?: string
  name?: string
  email?: string
  phoneNumber?: string
  profileImage?: string
  avatar?: string
  image?: string
  role?: string
  hasActiveSubscription?: boolean
  privateCommityAccess?: boolean
  isPaidForCommunity?: boolean
  subscriptionExpireDate?: string | null
  address?: string
  city?: string
  country?: string
  dob?: string
  postalCode?: string
  road?: string
  gender?: string
}

export interface Message {
  _id: string
  id: string
  content: string
  image?: string
  sender: {
    _id: string
    firstName: string
    avatar?: string
  }
  replyTo?: {
    _id: string
    content: string
    sender: {
      _id: string
      firstName: string
    }
  }
  createdAt: string
  updatedAt: string
}

export interface PaymentRequest {
  type: string
  groupId: string
  totalAmount: number
}
