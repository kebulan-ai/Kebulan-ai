export interface Deployment {
  id: string
  projectId: string
  name: string
  url?: string
  status: "pending" | "building" | "ready" | "error" | "canceled"
  createdAt: Date
  updatedAt: Date
  buildLogs: BuildLog[]
  environment: "production" | "preview"
  branch?: string
  commitHash?: string
  buildTime?: number
  error?: string
}

export interface BuildLog {
  id: string
  timestamp: Date
  level: "info" | "warn" | "error"
  message: string
}

export interface DeploymentRequest {
  projectId: string
  name?: string
  environment?: "production" | "preview"
  envVars?: Record<string, string>
}

export interface DeploymentProvider {
  id: string
  name: string
  icon: string
  description: string
  isConnected: boolean
  config?: Record<string, any>
}
