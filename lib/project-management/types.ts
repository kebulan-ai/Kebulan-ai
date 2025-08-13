export interface Project {
  id: string
  name: string
  description?: string
  type: "simple-app" | "ecommerce" | "blog" | "dashboard" | "landing" | "todo-app" | "chat-app"
  status: "draft" | "in-progress" | "completed" | "deployed"
  createdAt: Date
  updatedAt: Date
  files: ProjectFile[]
  messages: ChatMessage[]
  thumbnail?: string
  tags: string[]
  userId: string
  v0ChatId?: string
  v0VersionId?: string
  previewUrl?: string
}

export interface ProjectFile {
  id: string
  name: string
  content: string
  language: string
  type: "component" | "page" | "config" | "style" | "util"
  lastModified: Date
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  files?: ProjectFile[]
}

export interface CreateProjectRequest {
  name: string
  description?: string
  type?: Project["type"]
  template?: string
}

export interface UpdateProjectRequest {
  name?: string
  description?: string
  status?: Project["status"]
  tags?: string[]
}
