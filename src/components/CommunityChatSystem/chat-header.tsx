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
    <div className="border-b border-gray-200 bg-white">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-600 text-white">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden text-white hover:bg-slate-700"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-bold text-xl">WMC</span>
        </div>

        <div className="hidden md:block text-sm">Special Offers: Saved up to 30% by Purchase wellness things</div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="What can we help you to find?"
              className="pl-10 pr-12 bg-white text-gray-900 border-gray-300 w-80"
            />
            <Button
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 h-8 w-8 p-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 cursor-pointer hover:text-gray-300" />
            <div className="relative">
              <ShoppingCart className="h-5 w-5 cursor-pointer hover:text-gray-300" />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer">
              A
            </div>
          </div>

          {/* Social Icons */}
          <div className="hidden lg:flex items-center gap-2">
            <Facebook className="h-4 w-4 cursor-pointer hover:text-gray-300" />
            <Instagram className="h-4 w-4 cursor-pointer hover:text-gray-300" />
            <Twitter className="h-4 w-4 cursor-pointer hover:text-gray-300" />
            <Linkedin className="h-4 w-4 cursor-pointer hover:text-gray-300" />
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex items-center justify-center gap-8 px-6 py-2 text-sm border-b">
        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
          HOME
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
          SHOP
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
          BLOG
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium border-b-2 border-gray-900">
          COMMUNITY
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
          FIND A COACH
        </a>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-8 px-6 py-6">
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
        <div className="ml-auto flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
          <span className="text-xs text-gray-500">{isConnected ? "Connected" : "Disconnected"}</span>
        </div>
      </div>
    </div>
  )
}
