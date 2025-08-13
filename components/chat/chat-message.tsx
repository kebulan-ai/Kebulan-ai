"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Copy, ThumbsUp, ThumbsDown } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  files?: Array<{
    name: string
    content: string
    language: string
  }>
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { user } = useAuth()
  const isUser = message.role === "user"

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
  }

  return (
    <div className={`flex items-start space-x-3 ${isUser ? "flex-row-reverse space-x-reverse" : ""}`}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        {isUser ? (
          <>
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.firstName} />
            <AvatarFallback>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </AvatarFallback>
          </>
        ) : (
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </Avatar>

      <div className={`flex-1 max-w-3xl ${isUser ? "flex flex-col items-end" : ""}`}>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm font-medium">{isUser ? `${user?.firstName} ${user?.lastName}` : "Kebulan AI"}</span>
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        <Card className={`${isUser ? "bg-primary text-primary-foreground" : "bg-card"}`}>
          <CardContent className="p-4">
            <div className="prose prose-sm max-w-none">
              {message.content.split("\n").map((line, index) => {
                if (line.startsWith("🎯 **") || line.startsWith("**")) {
                  return (
                    <div key={index} className="font-semibold mt-3 mb-2">
                      {line.replace(/\*\*/g, "")}
                    </div>
                  )
                }
                if (line.startsWith("- ")) {
                  return (
                    <div key={index} className="ml-4 mb-1">
                      {line}
                    </div>
                  )
                }
                return line ? (
                  <p key={index} className="mb-2 last:mb-0">
                    {line}
                  </p>
                ) : (
                  <br key={index} />
                )
              })}
            </div>

            {message.files && message.files.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border/20">
                <div className="flex flex-wrap gap-2">
                  {message.files.map((file, index) => (
                    <Badge key={index} variant="secondary" className="bg-accent/10 text-accent">
                      {file.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {!isUser && (
          <div className="flex items-center space-x-2 mt-2">
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              <Copy className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm">
              <ThumbsUp className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm">
              <ThumbsDown className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
