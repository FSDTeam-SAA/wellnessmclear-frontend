"use client"

import { useState, useEffect } from "react"
import { ChatHeader } from "./chat-header"
import { ChatSidebar } from "./chat-sidebar"
import { ChatPanel } from "./chat-panel"
import { PaymentModal } from "./payment-modal"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiService, ApiError } from "@/lib/api-service"
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
  const [accessCheckInProgress, setAccessCheckInProgress] = useState(false)

  const queryClient = useQueryClient()
  const { data: session } = useSession()
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
  const { data: currentUser, refetch: refetchUser } = useQuery({
    queryKey: ["user", currentUserId],
    queryFn: () => {
      if (!currentUserId || !token) throw new Error("No user id or token")
      return apiService.getUser(currentUserId, token)
    },
    enabled: !!currentUserId && !!token,
  })

  // Fetch initial messages (requires token, after join)
  const {
    data: initialMessages = [],
    isLoading: messagesLoading,
    refetch: refetchMessages,
  } = useQuery({
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
    queryFn: async () => {
      if (!token || !currentGroupId) throw new Error("No token or groupId")
      try {
        return await apiService.getGroupUsers(currentGroupId, token)
      } catch (error) {
        console.error("Failed to fetch group users:", error)
        return [] // Return empty array on error
      }
    },
    enabled: !!currentGroupId && !!token && joinedGroup === currentGroupId,
  })

  // Check user access for private groups
  const checkPrivateGroupAccess = async (): Promise<boolean> => {
    if (!currentUser) return false

    // User has access if they have active subscription OR private community access
    return currentUser.hasActiveSubscription === true || currentUser.privateCommityAccess === true
  }

  // Join group with proper access control
  const joinGroupWithAccessCheck = async (groupId: string, groupType: string) => {
    if (!token) return

    try {
      setAccessCheckInProgress(true)

      // For private groups, check access first
      if (groupType === "private") {
        const hasAccess = await checkPrivateGroupAccess()

        if (!hasAccess) {
          // Refetch user data to get latest subscription status
          await refetchUser()
          const updatedHasAccess = await checkPrivateGroupAccess()

          if (!updatedHasAccess) {
            setShowPaymentModal(true)
            return
          }
        }
      }

      // Attempt to join the group
      await apiService.joinGroup(groupId, token)
      setJoinedGroup(groupId)

      // Load messages and users
      await Promise.all([refetchMessages(), refetchUsers()])
    } catch (error) {
      console.error("Failed to join group:", error)

      // If it's a private group access error, show payment modal
      if (error instanceof ApiError && error.status === 403 && groupType === "private") {
        setShowPaymentModal(true)
      } else {
        // For other errors, still allow joining (idempotent join)
        setJoinedGroup(groupId)
        await Promise.all([refetchMessages(), refetchUsers()])
      }
    } finally {
      setAccessCheckInProgress(false)
    }
  }

  // Join group on tab/group change
  useEffect(() => {
    if (!currentGroupId || !token) return
    if (joinedGroup === currentGroupId) return

    const currentGroup = groups.find((g) => g._id === currentGroupId)
    if (!currentGroup) return

    joinGroupWithAccessCheck(currentGroupId, currentGroup.groupType)
  }, [currentGroupId, token, groups])

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

  // Handle tab change with access control
  const handleTabChange = async (tab: ChatTab) => {
    if (tab === "private") {
      // Check if user has access to private community
      const hasAccess = await checkPrivateGroupAccess()

      if (!hasAccess) {
        setShowPaymentModal(true)
        return
      }
    }

    setActiveTab(tab)
    setMessages([]) // Clear messages when switching tabs
    setJoinedGroup(null) // Force re-join
  }

  // Payment mutation (requires token)
  const paymentMutation = useMutation({
    mutationFn: () => {
      if (!token) throw new Error("No token")
      return apiService.processPayment(
        {
          type: "group",
          groupId: "68661c4a415000d4ba893563",
          totalAmount: 19,
        },
        token,
      )
    },
    onSuccess: (res) => {
      const redirectUrl = res?.data?.url
      if (redirectUrl) {
        window.location.href = redirectUrl // 🔁 Redirect to Stripe checkout
      } else {
        console.error("Stripe redirect URL not found.")
      }
    },
    onError: (err) => {
      console.error("Payment initiation failed:", err)
    },
  })

  const handlePaymentSuccess = async () => {
    // Refetch user data to get updated subscription status
    await refetchUser()
    setShowPaymentModal(false)

    // If we were trying to access private tab, switch to it now
    if (activeTab !== "private") {
      setActiveTab("private")
      setMessages([])
      setJoinedGroup(null)
    }
  }

  const handleMessageSent = (message: Message) => {
    // Update your messages state
    setMessages((prev) => [...prev, message])
  }

  return (
    <div className="flex flex-col min-h-[70vh] max-h-screen h-full w-full bg-white rounded-lg shadow overflow-hidden">
      {/* Header (Tabs) */}
      <ChatHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
        isSidebarOpen={isSidebarOpen}
        isConnected={isConnected}
        accessCheckInProgress={accessCheckInProgress}
      />

      {/* Main content: sidebar + chat */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 border-r border-gray-200 bg-white ${
            isSidebarOpen ? "w-80 min-w-[16rem]" : "w-0"
          } h-full min-h-0 overflow-y-auto`}
        >
          <ChatSidebar users={users} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(true)} />
        </div>

        {/* Chat Panel */}
        <div className="flex-1 min-h-0 flex flex-col">
          <ChatPanel
            messages={messages}
            onMessageSent={handleMessageSent}
            isLoading={messagesLoading || accessCheckInProgress}
            activeTab={activeTab}
            groupId={currentGroupId || ""}
            isConnected={isConnected}
          />
        </div>
      </div>

      {/* Payment Modal (if needed) */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onPayment={() => paymentMutation.mutate()}
          onPaymentSuccess={handlePaymentSuccess}
          isLoading={paymentMutation.isPending}
        />
      )}
    </div>
  )
}
