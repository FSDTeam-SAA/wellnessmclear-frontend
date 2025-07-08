import type { User, Message, PaymentRequest } from "@/types/chat"

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1"

class ApiService {
  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    // Add authentication headers here if needed
    const headers = {
      ...options.headers,
      // 'Authorization': `Bearer ${token}`,
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Get user by ID
  async getUser(userId: string): Promise<User> {
    return this.fetchWithAuth(`/user/${userId}`)
  }

  // Get messages for a group with pagination
  async getMessages(groupId: string, page = 1, limit = 50): Promise<Message[]> {
    return this.fetchWithAuth(`/message/${groupId}?page=${page}&limit=${limit}`)
  }

  // Get users for a group
  async getUsers(groupId: string): Promise<User[]> {
    return this.fetchWithAuth(`/group/${groupId}/users`)
  }

  // Send a message (with file upload support)
  async sendMessage(groupId: string, formData: FormData): Promise<Message> {
    const response = await fetch(`${API_BASE_URL}/message/${groupId}`, {
      method: "POST",
      body: formData,
      // Don't set Content-Type header, let browser set it for FormData
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Join a group
  async joinGroup(groupId: string): Promise<void> {
    return this.fetchWithAuth(`/group/join/${groupId}`, {
      method: "POST",
    })
  }

  // Process payment
  async processPayment(data: PaymentRequest): Promise<{ success: boolean; checkoutUrl?: string }> {
    return this.fetchWithAuth("/payment/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }

  // Edit message
  async editMessage(messageId: string, content: string): Promise<Message> {
    return this.fetchWithAuth(`/message/${messageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    })
  }

  // Delete message
  async deleteMessage(messageId: string): Promise<void> {
    return this.fetchWithAuth(`/message/${messageId}`, {
      method: "DELETE",
    })
  }
}

export const apiService = new ApiService()
