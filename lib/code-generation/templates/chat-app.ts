import type { AppTemplate } from "../types"

export const chatAppTemplate: AppTemplate = {
  name: "Chat App",
  description: "A real-time chat application with rooms, user management, and message history",
  files: [
    {
      name: "app/page.tsx",
      content: `"use client"

import { useState, useEffect } from "react"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatWindow } from "@/components/chat/chat-window"
import { ChatHeader } from "@/components/chat/chat-header"

export interface User {
  id: string
  name: string
  avatar?: string
  status: "online" | "offline" | "away"
}

export interface Message {
  id: string
  text: string
  userId: string
  userName: string
  timestamp: Date
  roomId: string
}

export interface Room {
  id: string
  name: string
  description?: string
  memberCount: number
  lastMessage?: Message
}

export default function ChatApp() {
  const [currentUser] = useState<User>({
    id: "user-1",
    name: "John Doe",
    status: "online"
  })

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "general",
      name: "General",
      description: "General discussion",
      memberCount: 12,
    },
    {
      id: "random",
      name: "Random",
      description: "Random conversations",
      memberCount: 8,
    },
    {
      id: "tech",
      name: "Tech Talk",
      description: "Technology discussions",
      memberCount: 15,
    }
  ])

  const [currentRoom, setCurrentRoom] = useState<Room>(rooms[0])
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Welcome to the chat!",
      userId: "system",
      userName: "System",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      roomId: "general"
    },
    {
      id: "2",
      text: "Hello everyone! 👋",
      userId: "user-2",
      userName: "Jane Smith",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      roomId: "general"
    },
    {
      id: "3",
      text: "How's everyone doing today?",
      userId: "user-3",
      userName: "Mike Johnson",
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
      roomId: "general"
    }
  ])

  const [onlineUsers] = useState<User[]>([
    { id: "user-2", name: "Jane Smith", status: "online" },
    { id: "user-3", name: "Mike Johnson", status: "online" },
    { id: "user-4", name: "Sarah Wilson", status: "away" },
    { id: "user-5", name: "Tom Brown", status: "online" },
  ])

  const sendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      userId: currentUser.id,
      userName: currentUser.name,
      timestamp: new Date(),
      roomId: currentRoom.id
    }
    setMessages(prev => [...prev, newMessage])
  }

  const currentRoomMessages = messages.filter(msg => msg.roomId === currentRoom.id)

  return (
    <div className="h-screen flex bg-gray-100">
      <ChatSidebar
        rooms={rooms}
        currentRoom={currentRoom}
        onRoomSelect={setCurrentRoom}
        onlineUsers={onlineUsers}
        currentUser={currentUser}
      />
      
      <div className="flex-1 flex flex-col">
        <ChatHeader room={currentRoom} />
        <ChatWindow
          messages={currentRoomMessages}
          currentUser={currentUser}
          onSendMessage={sendMessage}
        />
      </div>
    </div>
  )
}`,
    },
    {
      name: "components/chat/chat-sidebar.tsx",
      content: `import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Hash, Users } from 'lucide-react'
import type { Room, User } from "@/app/page"

interface ChatSidebarProps {
  rooms: Room[]
  currentRoom: Room
  onRoomSelect: (room: Room) => void
  onlineUsers: User[]
  currentUser: User
}

export function ChatSidebar({ rooms, currentRoom, onRoomSelect, onlineUsers, currentUser }: ChatSidebarProps) {
  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "online": return "bg-green-500"
      case "away": return "bg-yellow-500"
      case "offline": return "bg-gray-500"
    }
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-900">Chat App</h1>
        <p className="text-sm text-gray-600">Welcome, {currentUser.name}</p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <Hash className="h-4 w-4 mr-2" />
            Rooms
          </h2>
          <div className="space-y-1">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => onRoomSelect(room)}
                className={\`w-full text-left p-3 rounded-lg transition-colors \${
                  currentRoom.id === room.id
                    ? "bg-blue-100 text-blue-900"
                    : "hover:bg-gray-100 text-gray-700"
                }\`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium"># {room.name}</div>
                    {room.description && (
                      <div className="text-xs text-gray-500 mt-1">{room.description}</div>
                    )}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {room.memberCount}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Online ({onlineUsers.length + 1})
          </h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 rounded-lg bg-blue-50">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {currentUser.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className={\`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white \${getStatusColor(currentUser.status)}\`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{currentUser.name} (You)</p>
              </div>
            </div>
            
            {onlineUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className={\`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white \${getStatusColor(user.status)}\`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}`,
    },
    {
      name: "components/chat/chat-header.tsx",
      content: `import { Hash, Users, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import type { Room } from "@/app/page"

interface ChatHeaderProps {
  room: Room
}

export function ChatHeader({ room }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Hash className="h-5 w-5 text-gray-500" />
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{room.name}</h1>
            {room.description && (
              <p className="text-sm text-gray-600">{room.description}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            {room.memberCount} members
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}`,
    },
    {
      name: "components/chat/chat-window.tsx",
      content: `"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Smile } from 'lucide-react'
import type { Message, User } from "@/app/page"

interface ChatWindowProps {
  messages: Message[]
  currentUser: User
  onSendMessage: (text: string) => void
}

export function ChatWindow({ messages, currentUser, onSendMessage }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim())
      setNewMessage("")
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const isConsecutiveMessage = (currentMsg: Message, prevMsg: Message | undefined) => {
    if (!prevMsg) return false
    return (
      currentMsg.userId === prevMsg.userId &&
      currentMsg.timestamp.getTime() - prevMsg.timestamp.getTime() < 5 * 60 * 1000 // 5 minutes
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const prevMessage = index > 0 ? messages[index - 1] : undefined
          const isConsecutive = isConsecutiveMessage(message, prevMessage)
          const isOwnMessage = message.userId === currentUser.id
          const isSystemMessage = message.userId === "system"

          if (isSystemMessage) {
            return (
              <div key={message.id} className="text-center">
                <div className="inline-block bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                  {message.text}
                </div>
              </div>
            )
          }

          return (
            <div key={message.id} className={\`flex \${isOwnMessage ? "justify-end" : "justify-start"}\`}>
              <div className={\`flex max-w-xs lg:max-w-md \${isOwnMessage ? "flex-row-reverse" : "flex-row"} \${isConsecutive ? "mt-1" : "mt-4"}\`}>
                {!isConsecutive && !isOwnMessage && (
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback className="text-xs">
                      {message.userName.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={\`\${isConsecutive && !isOwnMessage ? "ml-11" : ""}\`}>
                  {!isConsecutive && (
                    <div className={\`flex items-center mb-1 \${isOwnMessage ? "justify-end" : "justify-start"}\`}>
                      <span className="text-sm font-medium text-gray-900 mr-2">
                        {isOwnMessage ? "You" : message.userName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  )}
                  
                  <div
                    className={\`px-4 py-2 rounded-lg \${
                      isOwnMessage
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }\`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Button type="button" variant="ghost" size="icon">
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}`,
    },
  ],
}
