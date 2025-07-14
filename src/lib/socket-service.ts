/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { io, type Socket } from "socket.io-client"

class SocketService {
  private socket: Socket | null = null
  private serverUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000/api/v1"

  connect() {
    if (this.socket?.connected) return

    this.socket = io(this.serverUrl, {
      transports: ["websocket", "polling"],
      timeout: 20000,
    })

    this.socket.on("connect", () => {
      console.log("Connected to socket server with ID:", this.socket?.id)
    })

    this.socket.on("disconnect", (reason) => {
      console.log("Disconnected from socket server:", reason)
    })

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error)
    })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  joinRoom(groupId: string) {
    if (this.socket?.connected) {
      this.socket.emit("joinRoom", groupId)
      console.log(`Joined room: room-${groupId}`)
    }
  }

  emit(event: string, data: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data)
    } else {
      console.warn("Socket not connected, cannot emit event:", event)
    }
  }

  on(event: string, callback: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback)
    }
  }

  off(event: string, callback: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.off(event, callback)
    }
  }

  get connected() {
    return this.socket?.connected || false
  }
}

export const socketService = new SocketService()
