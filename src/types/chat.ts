export type ChatTab = "public" | "private"

export interface User {
  id: string
  name: string
  avatar?: string
  role?: "Admin" | "Coach" | "Member"
  isOnline?: boolean
  status?: string
  isPaidForCommunity?: boolean
  privateCommityAccess?: boolean
}

export interface Message {
  id: string
  content: string
  image?: string
  timestamp: string
  sender: User
  replyTo?: Message
}

export interface PaymentRequest {
  type: "group"
  groupId: string
  totalAmount: number
}

export interface SocketEvents {
  connect: () => void
  disconnect: (reason: string) => void
  newMessage: (message: Message) => void
  editMessage: (message: Message) => void
  deleteMessage: (data: { messageId: string }) => void
  sendMessage: (data: { groupId: string; content: string; replyTo?: string }) => void
  joinRoom: (groupId: string) => void
}
