import type { AuthResponse, Item, CreateItemData, UpdateItemData, User } from "@/types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

class ApiService {
  private baseURL = API_BASE_URL
  private token: string | null = null

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
    }
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`
    }

    return headers
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Network error" }))
      throw new Error(error.message || "Something went wrong")
    }

    return response.json()
  }

  // Auth endpoints
  async register(data: { name: string; email: string; password: string }): Promise<AuthResponse> {
    return this.request<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    return this.request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  // Profile endpoints
  async getProfile(): Promise<User> {
    return this.request<User>("/api/auth/profile")
  }

  async updateProfile(data: { name: string; email: string }): Promise<User> {
    return this.request<User>("/api/auth/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<{ message: string }> {
    return this.request<{ message: string }>("/api/auth/change-password", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  // Items endpoints
  async getItems(): Promise<Item[]> {
    return this.request<Item[]>("/api/items")
  }

  async createItem(data: CreateItemData): Promise<Item> {
    return this.request<Item>("/api/items", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateItem(id: string, data: UpdateItemData): Promise<Item> {
    return this.request<Item>(`/api/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteItem(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/api/items/${id}`, {
      method: "DELETE",
    })
  }

  async getExpiringItems(): Promise<Item[]> {
    return this.request<Item[]>("/api/items/expiring")
  }

  // Image upload
  async uploadImage(file: File): Promise<{ success: boolean; imageUrl: string; message: string }> {
    const formData = new FormData()
    formData.append('image', file)

    const url = `${this.baseURL}/api/items/upload-image`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Upload failed" }))
      throw new Error(error.message || "Failed to upload image")
    }

    return response.json()
  }

  // Health check
  async healthCheck(): Promise<{ message: string; timestamp: string; environment: string }> {
    return this.request<{ message: string; timestamp: string; environment: string }>("/health")
  }
}

export const apiService = new ApiService()
