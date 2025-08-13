"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { useProjectStore } from "@/lib/project-management/project-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Code, Eye, Download, Share, LogOut, Rocket } from "lucide-react"
import { AfricaLogo } from "@/components/ui/africa-logo"
import { ChatMessage } from "./chat-message"
import { CodePreview } from "./code-preview"
import { FileExplorer } from "./file-explorer"
import { ProjectHeader } from "@/components/project-management/project-header"
import { DeploymentDialog } from "@/components/deployment/deployment-dialog"
import { DeploymentStatus } from "@/components/deployment/deployment-status"
import { V0Generator } from "@/lib/code-generation/v0-generator"
import type { GeneratedFile } from "@/lib/code-generation/types"
import type { ChatMessage as ChatMessageType } from "@/lib/project-management/types"

export function ChatInterface() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const { currentProject, setCurrentProject, addMessage, updateFiles } = useProjectStore()
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [v0Generator] = useState(() => V0Generator.getInstance())
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)

  useEffect(() => {
    if (!currentProject) {
      router.push("/projects")
    }
  }, [currentProject, router])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [currentProject?.messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isGenerating || !currentProject || !user) return

    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    addMessage(currentProject.id, userMessage)
    setInput("")
    setIsGenerating(true)

    try {
      let response
      if (currentChatId) {
        response = await v0Generator.continueConversation(currentChatId, input)
      } else {
        response = await v0Generator.generateCode({
          prompt: input,
          userId: user.id,
          projectId: currentProject.id,
          appType: currentProject.type,
        })

        if (response.success && response.chatId) {
          setCurrentChatId(response.chatId)
        }
      }

      if (response.success) {
        const assistantMessage: ChatMessageType = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I've generated your application! Check the preview and code tabs to see the result.",
          timestamp: new Date(),
          files: response.files.map((file) => ({
            id: `${currentProject.id}_${file.name}_${Date.now()}`,
            name: file.name,
            content: file.content,
            language: file.language,
            type: getFileType(file.name),
            lastModified: new Date(),
          })),
        }

        addMessage(currentProject.id, assistantMessage)

        const projectFiles = response.files.map((file) => ({
          id: `${currentProject.id}_${file.name}_${Date.now()}`,
          name: file.name,
          content: file.content,
          language: file.language,
          type: getFileType(file.name),
          lastModified: new Date(),
        }))

        updateFiles(currentProject.id, projectFiles)

        if (response.previewUrl) {
          setCurrentProject({
            ...currentProject,
            v0ChatId: response.chatId,
            v0VersionId: response.versionId,
            previewUrl: response.previewUrl,
          })
        }

        setActiveTab("preview")
      } else {
        const errorMessage: ChatMessageType = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.error || "I encountered an error while generating your app. Please try again.",
          timestamp: new Date(),
        }
        addMessage(currentProject.id, errorMessage)
      }
    } catch (error) {
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an unexpected error. Please try again.",
        timestamp: new Date(),
      }
      addMessage(currentProject.id, errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleProjectChange = () => {
    router.push("/projects")
  }

  const getFileType = (filename: string): "component" | "page" | "config" | "style" | "util" => {
    if (filename.includes("component") || filename.endsWith(".tsx") || filename.endsWith(".jsx")) {
      return "component"
    }
    if (filename.includes("page") || filename.startsWith("app/")) {
      return "page"
    }
    if (filename.includes("config") || filename.endsWith(".json") || filename.endsWith(".js")) {
      return "config"
    }
    if (filename.endsWith(".css") || filename.endsWith(".scss")) {
      return "style"
    }
    return "util"
  }

  if (!currentProject) {
    return null
  }

  const generatedFiles: GeneratedFile[] = currentProject.files.map((file) => ({
    name: file.name,
    content: file.content,
    language: file.language,
    type: file.type,
  }))

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background via-cyan-50/30 to-background">
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <AfricaLogo className="w-5 h-5 text-primary-foreground" size={20} />
              </div>
              <span className="text-xl font-bold text-primary">Kebulan.ai</span>
            </div>
            <ProjectHeader project={currentProject} onProjectChange={handleProjectChange} />
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <DeploymentDialog
              project={currentProject}
              trigger={
                <Button size="sm">
                  <Rocket className="w-4 h-4 mr-2" />
                  Deploy
                </Button>
              }
            />
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.firstName} />
                <AvatarFallback>
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="border-b px-6">
              <TabsList className="grid w-full max-w-lg grid-cols-4">
                <TabsTrigger value="chat" className="flex items-center space-x-2">
                  <AfricaLogo className="w-4 h-4" size={16} />
                  <span>Chat</span>
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center space-x-2">
                  <Code className="w-4 h-4" />
                  <span>Code</span>
                </TabsTrigger>
                <TabsTrigger value="deployments" className="flex items-center space-x-2">
                  <Rocket className="w-4 h-4" />
                  <span>Deploy</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="chat" className="flex-1 flex flex-col m-0">
              <ScrollArea className="flex-1 px-6 py-4">
                <div className="space-y-6 max-w-4xl mx-auto">
                  {currentProject.messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isGenerating && (
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <AfricaLogo className="w-4 h-4 text-primary-foreground" size={16} />
                        </div>
                      </Avatar>
                      <Card className="flex-1">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                            <span className="text-muted-foreground">Generating your app...</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="border-t p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="flex space-x-4">
                    <div className="flex-1 relative">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Describe what you want to add or modify..."
                        className="pr-12 h-12 text-base"
                        disabled={isGenerating}
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isGenerating}
                        size="sm"
                        className="absolute right-2 top-2 h-8 w-8 p-0"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground text-center">
                    Press Enter to send, Shift+Enter for new line
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="flex-1 m-0">
              <CodePreview files={generatedFiles} />
            </TabsContent>

            <TabsContent value="code" className="flex-1 m-0">
              <div className="flex h-full">
                <div className="w-64 border-r bg-muted/30">
                  <FileExplorer files={generatedFiles} />
                </div>
                <div className="flex-1">
                  <CodePreview files={generatedFiles} showCode />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="deployments" className="flex-1 m-0">
              <div className="p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Deployments</h2>
                    <p className="text-muted-foreground">Deploy and manage your application</p>
                  </div>
                  <DeploymentStatus projectId={currentProject.id} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
