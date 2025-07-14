/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User, Message, PaymentRequest } from "@/types/chat"
import type { Group } from "@/types/group"

/** * Base URL for API requests, configurable via environment variable */
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api/v1"

/** * Custom error class for API-related errors */
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

/** * API Service class for handling all backend communication * Provides methods for user management, messaging, groups, and payments */
class ApiService {
  /**   * Generic fetch method with authentication and error handling   * @param url - API endpoint (relative to base URL)   * @param options - Fetch options   * @param token - Authentication token   * @returns Promise resolving to JSON response   * @throws ApiError on HTTP errors   */
  private async fetchWithAuth(url: string, options: RequestInit = {}, token: string): Promise<any> {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${token}`,
    }

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError(errorData.message || `HTTP error! status: ${response.status}`, response.status, errorData)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError("Network error occurred", 0, error)
    }
  }

  /**   * Fetch method for FormData requests (file uploads)   * @param url - API endpoint   * @param formData - Form data to send   * @param token - Authentication token   * @returns Promise resolving to JSON response   */
  private async fetchFormData(url: string, formData: FormData, token: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData - browser handles it
        },
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new ApiError(errorData.message || `HTTP error! status: ${response.status}`, response.status, errorData)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError("Network error occurred", 0, error)
    }
  }

  /**   * Safely extracts data from API response   * @param response - API response object   * @param fallback - Fallback value if data extraction fails   * @returns Extracted data or fallback   */
  private extractData<T>(response: any, fallback: T): T {
    return response?.data ?? response ?? fallback
  }

  // ==================== USER METHODS ====================

  /**   * Retrieve user information by ID   * @param userId - Unique user identifier   * @param token - Authentication token   * @returns Promise resolving to User object   */
  async getUser(userId: string, token: string): Promise<User> {
    const response = await this.fetchWithAuth(`/user/${userId}`, {}, token)
    return this.extractData(response, {} as User)
  }

  // ==================== MESSAGE METHODS ====================

  /**   * Retrieve messages for a specific group with pagination   * @param groupId - Group identifier   * @param token - Authentication token   * @param page - Page number (default: 1)   * @param limit - Messages per page (default: 50)   * @returns Promise resolving to array of Messages   */
  async getMessages(groupId: string, token: string, page = 1, limit = 50): Promise<Message[]> {
    const response = await this.fetchWithAuth(`/message/${groupId}?page=${page}&limit=${limit}`, {}, token)
    return this.extractData(response, [])
  }

  /**   * Send a new message to a group (supports file uploads)   * @param groupId - Target group identifier   * @param formData - Message data (text, files, etc.)   * @param token - Authentication token   * @returns Promise resolving to created Message   */
  async sendMessage(groupId: string, formData: FormData, token: string): Promise<Message> {
    return await this.fetchFormData(`/message/${groupId}`, formData, token)
  }

  /**   * Edit an existing message   * @param messageId - Message identifier   * @param content - New message content   * @param token - Authentication token   * @returns Promise resolving to updated Message   */
  async editMessage(messageId: string, content: string, token: string): Promise<Message> {
    return await this.fetchWithAuth(
      `/message/${messageId}`,
      {
        method: "PUT",
        body: JSON.stringify({ content }),
      },
      token,
    )
  }

  /**   * Delete a message   * @param messageId - Message identifier   * @param token - Authentication token   * @returns Promise resolving to void   */
  async deleteMessage(messageId: string, token: string): Promise<void> {
    await this.fetchWithAuth(
      `/message/${messageId}`,
      {
        method: "DELETE",
      },
      token,
    )
  }

  // ==================== GROUP METHODS ====================

  /**   * Retrieve all groups accessible to the user   * @param token - Authentication token   * @returns Promise resolving to array of Groups   */
  async getGroups(token: string): Promise<Group[]> {
    const response = await this.fetchWithAuth("/group", {}, token)
    return this.extractData(response, [])
  }

  /**
   * Get all users in a specific group
   * @param groupId - Group identifier
   * @param token - Authentication token
   * @returns Promise resolving to array of Users
   */
  async getGroupUsers(groupId: string, token: string): Promise<User[]> {
    const response = await this.fetchWithAuth(`/group/${groupId}/users`, {}, token)
    const data = this.extractData(response, [])

    // Handle case where API returns single user object instead of array
    if (data && !Array.isArray(data)) {
      return [data]
    }

    return Array.isArray(data) ? data : []
  }

  /**   * Join a group   * @param groupId - Group identifier to join   * @param token - Authentication token   * @returns Promise resolving to void   */
  async joinGroup(groupId: string, token: string): Promise<void> {
    await this.fetchWithAuth(
      `/group/join/${groupId}`,
      {
        method: "POST",
      },
      token,
    )
  }

  // ==================== PAYMENT METHODS ====================

  /**   * Process a payment request   * @param data - Payment request data   * @param token - Authentication token   * @returns Promise resolving to payment result with optional checkout URL   */
  async processPayment(
    data: PaymentRequest,
    token: string,
  ): Promise<{
    data: any
    success: boolean
    checkoutUrl?: string
  }> {
    return await this.fetchWithAuth(
      "/payment/checkout",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
      token,
    )
  }
}

/** * Singleton instance of ApiService for application-wide use */
export const apiService = new ApiService()

/** * Export ApiError for error handling in consuming components */
export { ApiError }
