"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Users } from "lucide-react";
import type { User } from "@/types/chat";
import { useQuery } from "@tanstack/react-query";

interface ChatSidebarProps {
  users: User[];
  isOpen: boolean;
  onClose: () => void;
}

// interface GroupedUsers {
//   admins: User[]
//   members: User[]
// }

export interface GroupMember {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}

export interface GroupMembersResponse {
  status: boolean;
  message: string;
  data: GroupMember[];
}

export function ChatSidebar({ isOpen }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Ensure users is always an array and has required properties
  // const safeUsers = useMemo(() => {
  //   if (!Array.isArray(users)) {
  //     console.warn("Users is not an array:", users)
  //     return []
  //   }

  //   return users.filter((user) => user && typeof user === "object" && user._id)
  // }, [users])

  // Filter and group users with memoization for performance
  // const { groupedUsers, totalCount } = useMemo(() => {
  //   const filteredUsers = safeUsers.filter((user) => {
  //     const firstName = user.firstName || ""
  //     const lastName = user.lastName || ""
  //     const fullName = `${firstName} ${lastName}`.toLowerCase()
  //     return fullName.includes(searchQuery.toLowerCase())
  //   })

  //   const grouped = filteredUsers.reduce(
  //     (acc, user) => {
  //       if (user.role === "ADMIN" || user.role === "admin") {
  //         acc.admins.push(user)
  //       } else {
  //         acc.members.push(user)
  //       }
  //       return acc
  //     },
  //     { admins: [], members: [] } as GroupedUsers,
  //   )

  //   return {
  //     groupedUsers: grouped,
  //     totalCount: filteredUsers.length,
  //   }
  // }, [safeUsers, searchQuery])

  /**
   * Generate user initials from name
   */
  // const getUserInitials = (user: User): string => {
  //   const firstName = user.firstName || ""
  //   const lastName = user.lastName || ""

  //   if (firstName && lastName) {
  //     return `${firstName[0]}${lastName[0]}`.toUpperCase()
  //   } else if (firstName) {
  //     return firstName.slice(0, 2).toUpperCase()
  //   }

  //   return "U"
  // }

  /**
   * Get user avatar URL with fallback
   */
  // const getUserAvatar = (user: User): string => {
  //   return user.profileImage || user.avatar || user.image || "/placeholder.svg?height=32&width=32"
  // }

  /**
   * Get user display name
   */
  // const getUserDisplayName = (user: User): string => {
  //   const firstName = user.firstName || ""
  //   const lastName = user.lastName || ""

  //   if (firstName && lastName) {
  //     return `${firstName} ${lastName}`
  //   } else if (firstName) {
  //     return firstName
  //   } else if (user.name) {
  //     return user.name
  //   }

  //   return "Unknown User"
  // }

  /**
   * Render user list section
   */
  // const renderUserSection = (title: string, users: User[], icon: React.ReactNode) => {
  //   if (users.length === 0) return null

  //   return (
  //     <div className="mb-6 ">
  //       <div className="flex items-center gap-2 mb-3 px-4">
  //         {icon}
  //         <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{title}</h3>
  //         <Badge variant="secondary" className="ml-auto text-xs">
  //           {users.length}
  //         </Badge>
  //       </div>
  //       <div className="space-y-1">
  //         {users.map((user) => (
  //           <div
  //             key={user._id}
  //             className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
  //           >
  //             <Avatar className="h-8 w-8 flex-shrink-0">
  //               <AvatarImage src={getUserAvatar(user) || "/placeholder.svg"} alt={getUserDisplayName(user)} />
  //               <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-medium">
  //                 {getUserInitials(user)}
  //               </AvatarFallback>
  //             </Avatar>
  //             <div className="flex-1 min-w-0">
  //               <div className="text-sm font-medium text-gray-900 truncate">{getUserDisplayName(user)}</div>
  //               {user.email && <div className="text-xs text-gray-500 truncate">{user.email}</div>}
  //             </div>
  //             {user.hasActiveSubscription && (
  //               <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
  //                 Pro
  //               </Badge>
  //             )}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   )
  // }

  const { data, isLoading, isError, error } = useQuery<GroupMembersResponse>({
    queryKey: ["groupMembers"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/group/members/68661b20063f89009f97df94`
      ).then((res) => res.json()),
  });
  console.log("Group Members Data:", data?.data?.length);

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  if (!isOpen) return null;

  return (
    <div className="h-full flex flex-col bg-white ">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Members</h2>
          <Badge
            variant="secondary"
            className="ml-auto flex items-center gap-1.5"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            {data?.data?.length || 0} Members
          </Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-9 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* User List */}
      {/* <div className="flex-1 overflow-y-auto">
        {data?.data?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <Users className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">No members found</p>
          </div>
        ) : totalCount === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <Search className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">No members match your search</p>
          </div>
        ) : (
          <div className="py-4">
            {renderUserSection("Admins", groupedUsers.admins, <Crown className="h-4 w-4 text-yellow-600" />)}
            {renderUserSection("Members", groupedUsers.members, <UserIcon className="h-4 w-4 text-gray-600" />)}
          </div>
        )}
      </div> */}
      <div className="">
        {data?.data?.length === 0 ? (
          <p className="text-sm">No members found</p>
        ) : (
          <div>
            {data?.data?.map((member) => {
              return (
                <div
                  key={member._id}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage
                      src={member.profileImage || "/placeholder.svg"}
                      alt={`${member.firstName} ${member.lastName}`}
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-medium">
                      {`${member.firstName[0]}${member.lastName[0]}`.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-full flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{`${member.firstName} ${member.lastName}`}</div>
                      {member.email && (
                        <div className="text-xs text-gray-500 truncate">
                          {member.email}
                        </div>
                      )}
                    </div>
                   
                     <span className="w-2 h-2 bg-green-500 rounded-full" />
                  
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
