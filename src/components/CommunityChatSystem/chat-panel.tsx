// @ts-check 
/* eslint-disable */

// This file is a part of the wellnessmclear-frontend project.
"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, ImageIcon, X, Loader2, Check, AlertCircle, Reply } from "lucide-react"
import { apiService } from "@/lib/api-service"
import { socketService } from "@/lib/socket-service"
import type { Message, ChatTab } from "@/types/chat"
import { useSession } from "next-auth/react"
import Image from "next/image"

interface ChatPanelProps {
  messages: Message[]
  isLoading: boolean
  activeTab: ChatTab
  groupId: string
  isConnected: boolean
  onMessageSent?: (message: Message) => void
}

/** * Message status enum for tracking message state */
enum MessageStatus {
  SENDING = "sending",
  SENT = "sent",
  FAILED = "failed",
}

/** * Interface for optimistic messages */
interface OptimisticMessage extends Omit<Message, "id" | "_id"> {
  id: string
  _id: string
  tempId: string
  status: MessageStatus
  createdAt: string
  isOptimistic: true
}

/** * Utility function to safely format time from timestamp */
const formatTime = (timestamp?: string | Date): string => {
  if (!timestamp) return "Invalid Date"
  const parsed = new Date(timestamp)
  if (isNaN(parsed.getTime())) return "Invalid Date"
  return parsed.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

/** * Utility function to safely format date for display */
const formatDate = (timestamp?: string | Date): string => {
  if (!timestamp) return ""
  const date = new Date(timestamp)
  if (isNaN(date.getTime())) {
    console.warn("Invalid date:", timestamp)
    return ""
  }

  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return "Today"
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday"
  } else {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    })
  }
}

/** * Utility function to format file size */
const formatFileSize = (bytes: number): string => {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

/** * Utility function to generate user initials */
const getUserInitials = (name?: string): string => {
  if (!name) return "U"
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

/** * Generate a temporary ID for optimistic updates */
const generateTempId = (): string => {
  return `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/** * Chat panel component for real-time messaging with optimistic updates */
export function ChatPanel({ messages, isLoading, groupId, isConnected, onMessageSent }: ChatPanelProps) {
  // Form state
  const [messageText, setMessageText] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const [isSending, setIsSending] = useState(false)

  // Optimistic updates state
  const [optimisticMessages, setOptimisticMessages] = useState<OptimisticMessage[]>([])
  const [failedMessages, setFailedMessages] = useState<Set<string>>(new Set())

  // Refs for DOM manipulation
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)

  // Session data
  const { data: session } = useSession()
  const currentUserId = session?.user?.id
  const token = session?.user?.accessToken || ""

  // Memoized user data for performance
  const currentUser = useMemo(
    () => ({
      id: currentUserId,
      name: session?.user?.name,
      image: session?.user?.image,
      initials: getUserInitials(session?.user?.name || ""),
      firstName: session?.user?.name?.split(" ")[0] || "You",
    }),
    [currentUserId, session?.user?.name, session?.user?.image],
  )

  // Filter and validate messages
  const validMessages = useMemo(() => {
    return messages.filter((msg) => {
      // Filter out messages with invalid or missing data
      return (
        msg &&
        (msg._id || msg.id) &&
        msg.sender &&
        msg.sender._id &&
        msg.createdAt &&
        // Ensure message has either content or image
        (msg.content || msg.image)
      )
    })
  }, [messages])

  // Combine real messages with optimistic messages and sort properly
  const allMessages = useMemo(() => {
    // Create a Set of real message IDs for deduplication
    const realMessageIds = new Set()
    const realMessageTempIds = new Set()

    validMessages.forEach((msg) => {
      if (msg._id) realMessageIds.add(msg._id)
      if (msg.id) realMessageIds.add(msg.id)
      // Also track any tempId that might be in real messages
      if ("tempId" in msg && msg.tempId) realMessageTempIds.add(msg.tempId)
    })

    // Filter optimistic messages to avoid duplicates
    const validOptimisticMessages = optimisticMessages.filter((msg) => {
      // Remove optimistic message if real message with same ID exists
      const hasRealMessage = realMessageIds.has(msg._id) || realMessageIds.has(msg.id)
      // Remove if tempId matches a real message
      const hasTempIdMatch = realMessageTempIds.has(msg.tempId)

      return !hasRealMessage && !hasTempIdMatch && msg.sender && msg.sender._id
    })

    const combined = [...validMessages, ...validOptimisticMessages]

    return combined.sort((a, b) => {
      const timeA = new Date(String(a.createdAt)).getTime()
      const timeB = new Date(String(b.createdAt)).getTime()
      return timeA - timeB
    })
  }, [validMessages, optimisticMessages])

  // Clean up optimistic messages when real messages arrive
  useEffect(() => {
    if (validMessages.length > 0) {
      const realMessageIds = new Set()
      validMessages.forEach((msg) => {
        if (msg._id) realMessageIds.add(msg._id)
        if (msg.id) realMessageIds.add(msg.id)
      })

      setOptimisticMessages((prev) => prev.filter((msg) => !realMessageIds.has(msg._id) && !realMessageIds.has(msg.id)))
    }
  }, [validMessages])

  // Auto-scroll logic with user scroll detection
  const handleScroll = useCallback(() => {
    if (!chatContainerRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
    setShouldAutoScroll(isNearBottom)
  }, [])

  const scrollToBottom = useCallback(
    (force = false) => {
      if ((shouldAutoScroll || force) && messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    },
    [shouldAutoScroll],
  )

  // Auto-scroll when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [allMessages.length, scrollToBottom])

  // Check if message is from current user
  const isOwnMessage = useCallback(
    (message: Message | OptimisticMessage) => {
      if (!currentUserId || !message.sender?._id) return false
      return message.sender._id === currentUserId
    },
    [currentUserId],
  )

  // Determine if date header should be shown
  const shouldShowDateHeader = useCallback(
    (currentMessage: Message | OptimisticMessage, index: number) => {
      if (index === 0) return true
      const currentDate = new Date(String(currentMessage.createdAt)).toDateString()
      const previousDate = new Date(String(allMessages[index - 1].createdAt)).toDateString()
      return currentDate !== previousDate
    },
    [allMessages],
  )

  // Handle image selection with preview generation
  const handleImageSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedImage(file)
    const reader = new FileReader()
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  // Clear image selection and preview
  const clearImageSelection = useCallback(() => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [])

  // Clear reply state
  const clearReply = useCallback(() => {
    setReplyingTo(null)
  }, [])

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setMessageText("")
    clearImageSelection()
    clearReply()
  }, [clearImageSelection, clearReply])

  // Create optimistic message for immediate UI update
  const createOptimisticMessage = useCallback(
    (content: string, image?: File, replyTo?: Message | null): OptimisticMessage => {
      const tempId = generateTempId()
      const now = new Date().toISOString()

      return {
        id: tempId,
        _id: tempId,
        tempId,
        content,
        image: image ? URL.createObjectURL(image) : undefined,
        sender: {
          _id: currentUserId!,
          firstName: currentUser.firstName,
          profileImage: currentUser.image || "",
        },
        replyTo: replyTo
          ? {
              _id: replyTo._id,
              content: replyTo.content,
              sender: replyTo.sender,
            }
          : undefined,
        createdAt: now,
        updatedAt: now,
        status: MessageStatus.SENDING,
        isOptimistic: true,
      }
    },
    [currentUserId, currentUser],
  )

  // Remove optimistic message
  const removeOptimisticMessage = useCallback((tempId: string) => {
    setOptimisticMessages((prev) => prev.filter((msg) => msg.tempId !== tempId))
  }, [])

  // Update optimistic message status
  const updateOptimisticMessageStatus = useCallback((tempId: string, status: MessageStatus) => {
    setOptimisticMessages((prev) => prev.map((msg) => (msg.tempId === tempId ? { ...msg, status } : msg)))
  }, [])

  // Retry failed message
  const retryFailedMessage = useCallback(
    async (message: OptimisticMessage) => {
      if (!token) return

      updateOptimisticMessageStatus(message.tempId, MessageStatus.SENDING)
      setFailedMessages((prev) => {
        const newSet = new Set(prev)
        newSet.delete(message.tempId)
        return newSet
      })

      try {
        const formData = new FormData()
        if (message.content) {
          formData.append("content", message.content)
        }
        if (message.replyTo) {
          formData.append("replyTo", message.replyTo._id)
        }

        const response = await apiService.sendMessage(groupId, formData, token)

        // Remove optimistic message on success
        removeOptimisticMessage(message.tempId)

        // Notify parent component
        if (onMessageSent) {
          onMessageSent(response)
        }

        // Don't emit socket event here as it might cause duplicates
      } catch (error) {
        console.error("Failed to retry message:", error)
        updateOptimisticMessageStatus(message.tempId, MessageStatus.FAILED)
        setFailedMessages((prev) => new Set(prev).add(message.tempId))
      }
    },
    [token, groupId, removeOptimisticMessage, updateOptimisticMessageStatus, onMessageSent],
  )

  // Send message function with optimistic updates
  const handleSendMessage = useCallback(async () => {
    const hasContent = messageText.trim() || selectedImage
    if (!hasContent || isSending || !isConnected || !token || !currentUserId) return

    // Store current form values
    const currentMessageText = messageText.trim()
    const currentImage = selectedImage
    const currentReplyTo = replyingTo

    // Create optimistic message immediately
    const optimisticMessage = createOptimisticMessage(currentMessageText, currentImage ?? undefined, currentReplyTo)
    setOptimisticMessages((prev) => [...prev, optimisticMessage])

    // Reset form immediately for better UX
    resetForm()
    setIsSending(true)

    // Force scroll to bottom for new message
    setTimeout(() => scrollToBottom(true), 100)

    try {
      // Prepare form data
      const formData = new FormData()
      if (currentMessageText) {
        formData.append("content", currentMessageText)
      }
      if (currentReplyTo) {
        formData.append("replyTo", currentReplyTo._id)
      }
      if (currentImage) {
        formData.append("image", currentImage)
      }

      // Send via REST API
      const response = await apiService.sendMessage(groupId, formData, token)

      // Update optimistic message to sent status
      updateOptimisticMessageStatus(optimisticMessage.tempId, MessageStatus.SENT)

      // Remove optimistic message after a delay (real message should arrive via socket)
      setTimeout(() => {
        removeOptimisticMessage(optimisticMessage.tempId)
      }, 2000)

      // Notify parent component
      if (onMessageSent) {
        onMessageSent(response)
      }

      // Emit socket event for real-time updates to other users only
      // Don't include the current user's data to avoid duplication
      socketService.emit("sendMessage", {
        groupId,
        content: currentMessageText,
        replyTo: currentReplyTo?._id || null,
      })
    } catch (error) {
      console.error("Failed to send message:", error)

      // Mark message as failed
      updateOptimisticMessageStatus(optimisticMessage.tempId, MessageStatus.FAILED)
      setFailedMessages((prev) => new Set(prev).add(optimisticMessage.tempId))

      // Restore form data for retry
      setMessageText(currentMessageText)
      if (currentImage) {
        setSelectedImage(currentImage)
        setImagePreview(URL.createObjectURL(currentImage))
      }
      setReplyingTo(currentReplyTo)
    } finally {
      setIsSending(false)
    }
  }, [
    messageText,
    selectedImage,
    replyingTo,
    isSending,
    isConnected,
    token,
    currentUserId,
    groupId,
    createOptimisticMessage,
    resetForm,
    updateOptimisticMessageStatus,
    removeOptimisticMessage,
    onMessageSent,
    scrollToBottom,
  ])

  // Handle Enter key press for sending messages
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage],
  )

  // Handle image click to open in new tab
  const handleImageClick = useCallback((imageUrl: string) => {
    window.open(imageUrl, "_blank")
  }, [])

  // Set reply target
  const handleReply = useCallback((message: Message | OptimisticMessage) => {
    setReplyingTo(message as Message)
  }, [])

  // Get message status icon
  const getMessageStatusIcon = useCallback((message: OptimisticMessage) => {
    switch (message.status) {
      case MessageStatus.SENDING:
        return <Loader2 className="h-3 w-3 animate-spin text-gray-400" />
      case MessageStatus.SENT:
        return <Check className="h-3 w-3 text-green-500" />
      case MessageStatus.FAILED:
        return <AlertCircle className="h-3 w-3 text-red-500" />
      default:
        return null
    }
  }, [])

  // Check if message is optimistic
  const isOptimisticMessage = useCallback((message: Message | OptimisticMessage): message is OptimisticMessage => {
    return "isOptimistic" in message && message.isOptimistic === true
  }, [])

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      optimisticMessages.forEach((msg) => {
        if (msg.image && msg.image.startsWith("blob:")) {
          URL.revokeObjectURL(msg.image)
        }
      })
    }
  }, [optimisticMessages])

  // Loading state
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading messages...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* Messages Area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-2"
        onScroll={handleScroll}
        style={{ scrollBehavior: "smooth" }}
      >
        {allMessages.map((message, index) => {
          const isOwn = isOwnMessage(message)
          const showDateHeader = shouldShowDateHeader(message, index)
          const senderInitials = getUserInitials(message.sender?.firstName)
          const isOptimistic = isOptimisticMessage(message)
          const isFailed = isOptimistic && failedMessages.has(message.tempId)

          // Skip rendering if message has invalid data
          if (!message.sender?._id || !message.createdAt || (!message.content && !message.image)) {
            console.warn("Skipping invalid message:", message)
            return null
          }

          return (
            <div key={isOptimistic ? message.tempId : message._id || message.id}>
              {/* Date Header */}
              {showDateHeader && (
                <div className="flex justify-center my-4">
                  <div className="bg-white px-3 py-1 rounded-full text-xs text-gray-500 shadow-sm border">
                    {formatDate(String(message.createdAt))}
                  </div>
                </div>
              )}

              {/* Message Container */}
              <div className={`flex gap-3 mb-3 ${isOwn ? "justify-end" : "justify-start"}`}>
                {/* Avatar for other users (left side) */}
                {!isOwn && (
                  <Avatar className="h-8 w-8 flex-shrink-0 mt-1">
                    <AvatarImage
                      src={message?.sender?.profileImage || "/placeholder.svg?height=32&width=32"}
                      alt={message.sender?.firstName || "User"}
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-medium">
                      {senderInitials}
                    </AvatarFallback>
                  </Avatar>
                )}

                {/* Message Content */}
                <div className={`max-w-[70%] ${isOwn ? "order-1" : "order-2"}`}>
                  {/* Sender name for other users */}
                  {!isOwn && (
                    <div className="text-xs text-gray-500 mb-1 ml-3">{message.sender?.firstName || "User"}</div>
                  )}

                  {/* Reply Preview */}
                  {message.replyTo && (
                    <div className={`mb-2 ${isOwn ? "mr-3" : "ml-3"}`}>
                      <div className="bg-gray-100 border-l-4 border-blue-400 p-2 rounded-r text-xs">
                        <div className="text-gray-600 mb-1 flex items-center gap-1">
                          <Reply className="h-3 w-3" />
                          Replying to {message.replyTo?.sender?.firstName || "User"}
                        </div>
                        <div className="text-gray-800 truncate">{message.replyTo?.content}</div>
                      </div>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl px-4 py-3 relative transition-all duration-200 ${
                      isOwn
                        ? `${isFailed ? "bg-red-400" : "bg-blue-500"} text-white rounded-br-md`
                        : "bg-white text-gray-800 rounded-bl-md shadow-sm border"
                    } ${isOptimistic ? "opacity-90" : "opacity-100"}`}
                  >
                    {/* Message Image */}
                    {message.image && (
                      <div className="mb-2">
                        <Image
                          width={200}
                          height={150}
                          src={message.image || "/placeholder.svg"}
                          alt="Message attachment"
                          className="max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                          loading="lazy"
                          onClick={() => handleImageClick(message.image!)}
                        />
                      </div>
                    )}

                    {/* Message Text */}
                    {message.content && (
                      <div className="whitespace-pre-wrap text-sm leading-relaxed break-words">{message.content}</div>
                    )}

                    {/* Failed message overlay */}
                    {isFailed && (
                      <div className="absolute inset-0 bg-red-500 bg-opacity-20 rounded-2xl flex items-center justify-center">
                        <button
                          onClick={() => retryFailedMessage(message)}
                          className="text-xs bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                        >
                          Retry
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Message Time, Status and Actions */}
                  <div
                    className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${
                      isOwn ? "justify-end mr-3" : "justify-start ml-3"
                    }`}
                  >
                    {!isFailed && (
                      <button
                        onClick={() => handleReply(message)}
                        className="hover:text-blue-600 transition-colors flex items-center gap-1"
                        disabled={isSending}
                      >
                        <Reply className="h-3 w-3" />
                        Reply
                      </button>
                    )}
                    {!isFailed && <span>•</span>}
                    <span>{formatTime(String(message.createdAt))}</span>
                    {/* Status indicator for own messages */}
                    {isOwn && isOptimistic && (
                      <>
                        <span>•</span>
                        {getMessageStatusIcon(message)}
                      </>
                    )}
                  </div>
                </div>

                {/* Avatar for own messages (right side) */}
                {isOwn && (
                  <Avatar className="h-8 w-8 flex-shrink-0 mt-1 order-2">
                    <AvatarImage src={currentUser.image || "/placeholder.svg?height=32&width=32"} alt="You" />
                    <AvatarFallback className="bg-blue-500 text-white text-xs font-medium">
                      {currentUser.initials}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply Preview */}
      {replyingTo && (
        <div className="px-4 py-3 bg-blue-50 border-t border-blue-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-blue-700 mb-1 flex items-center gap-1">
                <Reply className="h-4 w-4" />
                Replying to {replyingTo.sender?.firstName}
              </div>
              <div className="text-sm text-gray-600 truncate">{replyingTo.content}</div>
            </div>
            <Button variant="ghost" size="sm" onClick={clearReply} disabled={isSending}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Image Preview */}
      {selectedImage && imagePreview && (
        <div className="px-4 py-3 bg-gray-50 border-t">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <Image
                width={48}
                height={48}
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-12 h-12 object-cover rounded border"
              />
              <div>
                <div className="text-sm font-medium text-gray-700">{selectedImage.name}</div>
                <div className="text-xs text-gray-500">{formatFileSize(selectedImage.size)}</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={clearImageSelection} disabled={isSending}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-end gap-3">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="flex-shrink-0 p-2"
            disabled={isSending}
            title="Attach image"
          >
            <ImageIcon className="h-5 w-5 text-gray-500" />
          </Button>

          <div className="flex-1">
            <Input
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-full"
              disabled={isSending || !isConnected}
            />
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={(!messageText.trim() && !selectedImage) || isSending || !isConnected}
            className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
            title={isSending ? "Sending..." : "Send message"}
          >
            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>

        {/* Connection Status */}
        {!isConnected && (
          <div className="text-xs text-red-500 mt-2 text-center">Disconnected from server. Trying to reconnect...</div>
        )}
      </div>
    </div>
  )
}
