"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Users, Lock, Search, Heart, ShoppingCart, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import type { ChatTab } from "@/types/chat"

interface ChatHeaderProps {
  activeTab: ChatTab
  onTabChange: (tab: ChatTab) => void
  onToggleSidebar: () => void
  isSidebarOpen: boolean
  isConnected: boolean
}

export function ChatHeader({ activeTab, onTabChange, onToggleSidebar, isSidebarOpen, isConnected }: ChatHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white flex items-center justify-center">
     

      {/* Tab Navigation */}
      <div className="flex items-center gap-8 px-6 py-6 ">
        <button
          onClick={() => onTabChange("public")}
          className={`flex items-center gap-3 pb-2 border-b-2 transition-colors ${
            activeTab === "public"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
        >
          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-left">
            <div className="font-medium text-base">Public Community</div>
            <div className="text-sm text-gray-500">All the users Are here</div>
          </div>
        </button>

        <button
          onClick={() => onTabChange("private")}
          className={`flex items-center gap-3 pb-2 border-b-2 transition-colors ${
            activeTab === "private"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-800"
          }`}
        >
          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
            <Lock className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-left">
            <div className="font-medium text-base">Private Community</div>
            <div className="text-sm text-gray-500">Here Several Coaches Are Available</div>
          </div>
        </button>

        {/* Connection Status */}
        {/* <div className="ml-auto flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
          <span className="text-xs text-gray-500">{isConnected ? "Connected" : "Disconnected"}</span>
        </div> */}
      </div>
    </div>
  )
}
