"use client"

import { useState, useEffect } from "react"
import type { User } from "@/types"
import { apiService } from "@/lib/api"
import { toast } from "sonner"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        apiService.setToken(token)
      } catch (error) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.login({ email, password })

      const userData: User = {
        _id: response._id,
        name: response.name,
        email: response.email,
      }

      setUser(userData)
      apiService.setToken(response.token)
      localStorage.setItem("user", JSON.stringify(userData))

      toast.success("Welcome back!")
      return { success: true }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed"
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await apiService.register({ name, email, password })

      const userData: User = {
        _id: response._id,
        name: response.name,
        email: response.email,
      }

      setUser(userData)
      apiService.setToken(response.token)
      localStorage.setItem("user", JSON.stringify(userData))

      toast.success("Account created successfully!")
      return { success: true }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed"
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const logout = () => {
    setUser(null)
    apiService.clearToken()
    localStorage.removeItem("user")
    toast.success("Logged out successfully")
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
  }
}
