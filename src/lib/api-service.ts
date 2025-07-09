import type { User, Message, PaymentRequest } from "@/types/chat"

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1"
// const GetToken = ()=>{
//     const {data:session} = useSession()
//     const token = session?.user.accessToken
//     return token
// }
class ApiService {
  private async fetchWithAuth(url: string, options: RequestInit = {}, token: string) {
   
    // Add authentication headers here if needed
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
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



  // Get user by ID (requires token)
  async getUser(userId: string, token: string): Promise<User> {
    const response = await this.fetchWithAuth(`/user/${userId}`, {}, token)
    return response.data || response // fallback for old API
  }

  // Get messages for a group (unwraps .data)
  async getMessages(groupId: string, token: string, page = 1, limit = 50): Promise<Message[]> {
    const response = await this.fetchWithAuth(`/message/${groupId}?page=${page}&limit=${limit}`, {}, token)
    return response.data || []
  }

  // Get users for a group (unwraps .data)
  async getUsers(groupId: string, token: string): Promise<User[]> {
    const response = await this.fetchWithAuth(`/group/${groupId}/users`, {}, token)
    return response.data || []
  }

  // Get all groups
  async getGroups(token: string): Promise<import("@/types/group").Group[]> {
    const response = await this.fetchWithAuth(`/group`, {}, token)
    return response.data || []
  }

  // Send a message (with file upload support)
  async sendMessage(groupId: string, formData: FormData, token: string): Promise<Message> {
    //   alert("clicked")
    const response = await fetch(`${API_BASE_URL}/message/${groupId}`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
      // Don't set Content-Type header, let browser set it for FormData
      
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }


  // Join a group (requires token)
  async joinGroup(groupId: string, token: string): Promise<void> {
    return this.fetchWithAuth(`/group/join/${groupId}`, {
      method: "POST",
    }, token)
  }


  // Process payment (requires token)
  async processPayment(data: PaymentRequest, token: string): Promise<{ success: boolean; checkoutUrl?: string }> {
    return this.fetchWithAuth("/payment/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }, token)
  }


  // Edit message (requires token)
  async editMessage(messageId: string, content: string, token: string): Promise<Message> {
    return this.fetchWithAuth(`/message/${messageId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    }, token)
  }


  // Delete message (requires token)
  async deleteMessage(messageId: string, token: string): Promise<void> {
    return this.fetchWithAuth(`/message/${messageId}`, {
      method: "DELETE",
    }, token)
  }
}

export const apiService = new ApiService()
