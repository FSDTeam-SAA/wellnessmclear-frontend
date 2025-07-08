"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, ImageIcon, X, Loader2 } from "lucide-react"
import { apiService } from "@/lib/api-service"
import { socketService } from "@/lib/socket-service"
import type { Message, ChatTab } from "@/types/chat"

interface ChatPanelProps {
  messages: Message[]
  isLoading: boolean
  activeTab: ChatTab
  groupId: string
  isConnected: boolean
}

export function ChatPanel({ messages, isLoading, activeTab, groupId, isConnected }: ChatPanelProps) {
  const [messageText, setMessageText] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Handle image selection with preview
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Send message function
  const handleSendMessage = async () => {
    if ((!messageText.trim() && !selectedImage) || isSending || !isConnected) return

    setIsSending(true)

    try {
      // Create FormData for file upload
      const formData = new FormData()
      if (messageText.trim()) {
        formData.append("content", messageText.trim())
      }
      if (replyingTo) {
        formData.append("replyTo", replyingTo.id)
      }
      if (selectedImage) {
        formData.append("image", selectedImage)
      }

      // Send via REST API (for file uploads)
      const response = await apiService.sendMessage(groupId, formData)

      // Also emit via socket for real-time updates (without image)
      socketService.emit("sendMessage", {
        groupId,
        content: messageText.trim(),
        replyTo: replyingTo?.id || null,
      })

      // Clear form
      setMessageText("")
      setSelectedImage(null)
      setImagePreview(null)
      setReplyingTo(null)
    } catch (error) {
      console.error("Failed to send message:", error)
      // You could add a toast notification here
    } finally {
      setIsSending(false)
    }
  }

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Format time display
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  // Format date header
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

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
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Messages Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6" style={{ scrollBehavior: "smooth" }}>
        {messages.map((message, index) => {
          const showDateHeader =
            index === 0 ||
            new Date(message.timestamp).toDateString() !== new Date(messages[index - 1].timestamp).toDateString()

          return (
            <div key={message.id}>
              {/* Date Header */}
              {showDateHeader && (
                <div className="text-center text-sm text-gray-500 my-6 font-medium">
                  {formatDate(message.timestamp)}
                </div>
              )}

              {/* Message */}
              <div className="flex gap-3">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage
                    src={message.sender.avatar || "/placeholder.svg?height=40&width=40"}
                    alt={message.sender.name}
                  />
                  <AvatarFallback className="bg-green-100 text-green-700 text-sm font-medium">
                    {message.sender.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">{message.sender.name}</span>
                    <span className="text-xs text-gray-500">{message.sender.id}</span>
                  </div>

                  {/* Reply Preview */}
                  {message.replyTo && (
                    <div className="bg-gray-100 border-l-4 border-blue-400 p-3 mb-3 rounded-r">
                      <div className="text-xs text-gray-600 mb-1">Replying to {message.replyTo.sender.name}</div>
                      <div className="text-sm text-gray-800 truncate">{message.replyTo.content}</div>
                    </div>
                  )}

                  {/* Message Image */}
                  {message.image && (
                    <div className="mb-3">
                      <img
                        src={message.image || "/placeholder.svg"}
                        alt="Message attachment"
                        className="max-w-sm max-h-80 rounded-lg shadow-sm object-cover cursor-pointer hover:shadow-md transition-shadow"
                        loading="lazy"
                        onClick={() => {
                          // Could open in modal/lightbox
                          window.open(message.image, "_blank")
                        }}
                      />
                    </div>
                  )}

                  {/* Message Content */}
                  {message.content && (
                    <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">{message.content}</div>
                  )}

                  {/* Message Actions */}
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => setReplyingTo(message)}
                      className="text-xs text-gray-500 hover:text-blue-600 font-medium transition-colors"
                    >
                      Reply
                    </button>
                    <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Reply Preview */}
      {replyingTo && (
        <div className="px-6 py-3 bg-blue-50 border-t border-blue-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-blue-700 mb-1">Replying to {replyingTo.sender.name}</div>
              <div className="text-sm text-gray-600 truncate">{replyingTo.content}</div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Image Preview */}
      {selectedImage && imagePreview && (
        <div className="px-6 py-3 bg-gray-50 border-t">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-12 h-12 object-cover rounded border"
              />
              <div>
                <div className="text-sm font-medium text-gray-700">{selectedImage.name}</div>
                <div className="text-xs text-gray-500">{(selectedImage.size / 1024 / 1024).toFixed(2)} MB</div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedImage(null)
                setImagePreview(null)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-6 bg-white border-t">
        <div className="flex items-end gap-3">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="flex-shrink-0 p-2"
            disabled={isSending}
          >
            <ImageIcon className="h-5 w-5 text-gray-500" />
          </Button>

          <div className="flex-1">
            <Input
              placeholder="Type your message"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="resize-none border-gray-300 focus:border-green-500 focus:ring-green-500"
              disabled={isSending || !isConnected}
            />
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={(!messageText.trim() && !selectedImage) || isSending || !isConnected}
            className="flex-shrink-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2"
          >
            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>

        {!isConnected && (
          <div className="text-xs text-red-500 mt-2 text-center">Disconnected from server. Trying to reconnect...</div>
        )}
      </div>
    </div>
  )
}
