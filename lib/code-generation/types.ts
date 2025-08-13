export interface GenerationRequest {
  prompt: string
  userId?: string
  projectId?: string
  context?: string[]
}

export interface GenerationResponse {
  success: boolean
  files: GeneratedFile[]
  message: string
  template?: string
  error?: string
  metadata?: {
    generatedAt: Date
    promptAnalysis: any
    filesCount: number
  }
}

export interface GeneratedFile {
  name: string
  content: string
  language: string
  type: "component" | "page" | "config" | "style" | "util"
}

export interface AppTemplate {
  id: string
  name: string
  description: string
  features: string[]
  techStack: string[]
  files: TemplateFile[]
}

export interface TemplateFile {
  name: string
  content: string | ((context: any) => string)
  language: string
  type: "component" | "page" | "config" | "style" | "util"
}

export interface ParsedPrompt {
  keywords: string[]
  appType: string
  features: string[]
  styling: string[]
  complexity: "simple" | "medium" | "complex"
  customizations: Record<string, any>
}
