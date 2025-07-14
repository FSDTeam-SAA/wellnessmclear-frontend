"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { User } from "@/types/chat"

interface ChatSidebarProps {
  users: User[]
  isOpen: boolean
  onClose: () => void
}

export function ChatSidebar({ users, isOpen, onClose }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter and group users with memoization for performance
  const { groupedUsers, totalCount } = useMemo(() => {
    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const grouped = filteredUsers.reduce(
      (acc, user) => {
        const role = user.role || "Member"
        if (!acc[role]) {
          acc[role] = []
        }
        acc[role].push(user)
        return acc
      },
      {} as Record<string, User[]>,
    )

    return {
      groupedUsers: grouped,
      totalCount: filteredUsers.length,
    }
  }, [users, searchQuery])

  // Define role order and colors to match screenshots
  const roleOrder = ["Member", "Coach", "Admin"]
  const roleColors = {
    Admin: "text-purple-600",
    Coach: "text-purple-600",
    Member: "text-gray-600",
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Mobile close button */}
      <div className="flex items-center justify-between p-4 border-b lg:hidden">
        <h2 className="font-semibold">Community Members</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search Message"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200 text-sm"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        {roleOrder.map((role) => {
          const roleUsers = groupedUsers[role]
          if (!roleUsers || roleUsers.length === 0) return null

          return (
            <div key={role} className="p-4">
              {/* Role Header - only show for Coach and Admin */}
              {role !== "Member" && (
                <div className="mb-4">
                  <h3 className={`text-lg font-medium ${roleColors[role as keyof typeof roleColors]}`}>{role}</h3>
                </div>
              )}

              {/* Users in this role */}
              <div className="space-y-3">
                {roleUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg?height=40&width=40"} alt={user.name} />
                        <AvatarFallback className="bg-green-100 text-green-700 text-sm font-medium">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {/* Online indicator */}
                      {user.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      {user.status && <p className="text-xs text-gray-500 truncate">{user.status}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* No results message */}
        {totalCount === 0 && searchQuery && (
          <div className="p-4 text-center text-gray-500 text-sm">No users found matching "{searchQuery}"</div>
        )}
      </div>
    </div>
  )
}
