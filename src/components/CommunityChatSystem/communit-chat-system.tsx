"use client"

import { useState, useEffect, useRef } from "react"
import { ChatHeader } from "./chat-header"
import { ChatSidebar } from "./chat-sidebar"
import { ChatPanel } from "./chat-panel"
import { PaymentModal } from "./payment-modal"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiService } from "@/lib/api-service"
import { socketService } from "@/lib/socket-service"
import type { ChatTab, Message } from "@/types/chat"
import type { Group } from "@/types/group"
import { useSession } from "next-auth/react"

export function CommunityChatSystem() {
  const [activeTab, setActiveTab] = useState<ChatTab>("public")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [groups, setGroups] = useState<Group[]>([])
  const [groupIds, setGroupIds] = useState<{ public?: string; private?: string }>({})
  const [joinedGroup, setJoinedGroup] = useState<string | null>(null)
  const queryClient = useQueryClient()
  const {data:session} = useSession()

  const currentUserId = session?.user?.id
  const token = session?.user.accessToken

  // Get groupId for current tab
  const currentGroupId = groupIds[activeTab]

  // Fetch groups on mount
  useEffect(() => {
    if (!token) return
    apiService.getGroups(token).then((groups) => {
      setGroups(groups)
      const ids: { public?: string; private?: string } = {}
      for (const g of groups) {
        if (g.groupType === "public") ids.public = g._id
        if (g.groupType === "private") ids.private = g._id
      }
      setGroupIds(ids)
    })
  }, [token])

  // Fetch current user (requires token and id)
  const { data: currentUser } = useQuery({
    queryKey: ["user", currentUserId],
    queryFn: () => {
      if (!currentUserId || !token) throw new Error("No user id or token")
      return apiService.getUser(currentUserId, token)
    },
    enabled: !!currentUserId && !!token,
  })

  // Fetch initial messages (requires token, after join)
  const { data: initialMessages = [], isLoading: messagesLoading, refetch: refetchMessages } = useQuery({
    queryKey: ["messages", currentGroupId],
    queryFn: () => {
      if (!token || !currentGroupId) throw new Error("No token or groupId")
      return apiService.getMessages(currentGroupId, token)
    },
    enabled: !!currentGroupId && !!token && joinedGroup === currentGroupId,
  })

  // Fetch users for sidebar (requires token, after join)
  const { data: users = [], refetch: refetchUsers } = useQuery({
    queryKey: ["users", currentGroupId],
    queryFn: () => {
      if (!token || !currentGroupId) throw new Error("No token or groupId")
      return apiService.getUsers(currentGroupId, token)
    },
    enabled: !!currentGroupId && !!token && joinedGroup === currentGroupId,
  })

  // Join group on tab/group change
  useEffect(() => {
    if (!currentGroupId || !token) return
    if (joinedGroup === currentGroupId) return
    apiService.joinGroup(currentGroupId, token)
      .then(() => {
        setJoinedGroup(currentGroupId)
        refetchMessages()
        refetchUsers()
      })
      .catch((e) => {
        // Optionally handle join error
        setJoinedGroup(currentGroupId) // allow anyway for idempotent join
        refetchMessages()
        refetchUsers()
      })
  }, [currentGroupId, token])

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!currentGroupId) return

    const handleConnect = () => {
      setIsConnected(true)
      console.log("Connected to socket server")
    }

    const handleDisconnect = () => {
      setIsConnected(false)
      console.log("Disconnected from socket server")
    }

    const handleNewMessage = (message: Message) => {
      setMessages((prev) => [...prev, message])
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["messages", currentGroupId] })
    }

    const handleEditMessage = (updatedMessage: Message) => {
      setMessages((prev) => prev.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg)))
    }

    const handleDeleteMessage = ({ messageId }: { messageId: string }) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
    }

    // Connect to socket
    socketService.connect()
    socketService.joinRoom(currentGroupId)

    // Set up event listeners
    socketService.on("connect", handleConnect)
    socketService.on("disconnect", handleDisconnect)
    socketService.on("newMessage", handleNewMessage)
    socketService.on("editMessage", handleEditMessage)
    socketService.on("deleteMessage", handleDeleteMessage)

    return () => {
      socketService.off("connect", handleConnect)
      socketService.off("disconnect", handleDisconnect)
      socketService.off("newMessage", handleNewMessage)
      socketService.off("editMessage", handleEditMessage)
      socketService.off("deleteMessage", handleDeleteMessage)
    }
  }, [currentGroupId, queryClient])

  // Set initial messages when loaded
  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages)
    }
  }, [initialMessages])

  // Handle tab change
  const handleTabChange = (tab: ChatTab) => {
    if (tab === "private") {
      // Check if user has access to private community
      if (!currentUser?.isPaidForCommunity && !currentUser?.privateCommityAccess) {
        setShowPaymentModal(true)
        return
      }
    }
    setActiveTab(tab)
    setMessages([]) // Clear messages when switching tabs
    setJoinedGroup(null) // force re-join
  }

  // Payment mutation (requires token)
  const paymentMutation = useMutation({
    mutationFn: () => {
      if (!token) throw new Error("No token")
      return apiService.processPayment({
        type: "group",
        groupId: "68661c4a415000d4ba893563",
        totalAmount: 100,
      }, token)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", currentUserId] })
      setShowPaymentModal(false)
      setActiveTab("private")
    },
  })

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-80" : "w-0"} transition-all duration-300 overflow-hidden border-r border-gray-200 lg:w-80 lg:block`}
      >
        <ChatSidebar users={users} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <ChatHeader
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          isConnected={isConnected}
        />

        {/* Chat Panel */}
        <ChatPanel
          messages={messages}
          isLoading={messagesLoading}
          activeTab={activeTab}
          groupId={currentGroupId}
          isConnected={isConnected}
        />
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onPayment={() => paymentMutation.mutate()}
          isLoading={paymentMutation.isPending}
        />
      )}
    </div>
  )
}
