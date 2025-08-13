"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  signOut: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // In a real app, this would check with your backend
      const storedUser = localStorage.getItem("kebulan_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Mock authentication - replace with real API call
      const mockUser: User = {
        id: "1",
        email,
        firstName: "John",
        lastName: "Doe",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }

      localStorage.setItem("kebulan_user", JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      throw new Error("Sign in failed")
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    setLoading(true)
    try {
      // Mock registration - replace with real API call
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        firstName,
        lastName,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }

      localStorage.setItem("kebulan_user", JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      throw new Error("Sign up failed")
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    localStorage.removeItem("kebulan_user")
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
