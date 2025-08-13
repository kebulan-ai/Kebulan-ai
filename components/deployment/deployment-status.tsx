"use client"

import { useEffect } from "react"
import { useDeploymentStore } from "@/lib/deployment/deployment-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExternalLink, MoreHorizontal, RefreshCw, X, Trash2, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react"
import type { Deployment } from "@/lib/deployment/types"

interface DeploymentStatusProps {
  projectId: string
}

export function DeploymentStatus({ projectId }: DeploymentStatusProps) {
  const { getProjectDeployments, refreshDeployment, cancelDeployment, deleteDeployment } = useDeploymentStore()

  const deployments = getProjectDeployments(projectId).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  // Auto-refresh active deployments
  useEffect(() => {
    const activeDeployments = deployments.filter((d) => d.status === "pending" || d.status === "building")

    if (activeDeployments.length > 0) {
      const interval = setInterval(() => {
        activeDeployments.forEach((deployment) => {
          refreshDeployment(deployment.id)
        })
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [deployments, refreshDeployment])

  const getStatusIcon = (status: Deployment["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "building":
        return <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
      case "ready":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "canceled":
        return <X className="w-4 h-4 text-gray-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: Deployment["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "building":
        return "bg-blue-100 text-blue-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "canceled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgress = (deployment: Deployment) => {
    switch (deployment.status) {
      case "pending":
        return 10
      case "building":
        return Math.min(90, 20 + deployment.buildLogs.length * 10)
      case "ready":
        return 100
      case "error":
      case "canceled":
        return 0
      default:
        return 0
    }
  }

  if (deployments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No deployments yet. Deploy your project to see it here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {deployments.map((deployment) => (
        <Card key={deployment.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(deployment.status)}
                <div>
                  <CardTitle className="text-lg">{deployment.name}</CardTitle>
                  <CardDescription>
                    {deployment.environment} • {new Date(deployment.createdAt).toLocaleString()}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(deployment.status)}>{deployment.status}</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => refreshDeployment(deployment.id)}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </DropdownMenuItem>
                    {deployment.url && (
                      <DropdownMenuItem onClick={() => window.open(deployment.url, "_blank")}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open Site
                      </DropdownMenuItem>
                    )}
                    {(deployment.status === "pending" || deployment.status === "building") && (
                      <DropdownMenuItem onClick={() => cancelDeployment(deployment.id)}>
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => deleteDeployment(deployment.id)} className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {(deployment.status === "pending" || deployment.status === "building") && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    {deployment.status === "pending" ? "Preparing deployment..." : "Building..."}
                  </span>
                  <span className="text-sm text-muted-foreground">{getProgress(deployment)}%</span>
                </div>
                <Progress value={getProgress(deployment)} className="h-2" />
              </div>
            )}

            {deployment.url && (
              <div className="mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">URL:</span>
                  <a
                    href={deployment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center space-x-1"
                  >
                    <span>{deployment.url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {deployment.buildTime && (
              <div className="mb-4">
                <span className="text-sm text-muted-foreground">Build time: {deployment.buildTime}s</span>
              </div>
            )}

            {deployment.buildLogs.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Build Logs</h4>
                <ScrollArea className="h-32 w-full border rounded-md p-2">
                  <div className="space-y-1">
                    {deployment.buildLogs.map((log) => (
                      <div key={log.id} className="text-xs font-mono">
                        <span className="text-muted-foreground">{log.timestamp.toLocaleTimeString()}</span>{" "}
                        <span
                          className={
                            log.level === "error"
                              ? "text-red-600"
                              : log.level === "warn"
                                ? "text-yellow-600"
                                : "text-foreground"
                          }
                        >
                          {log.message}
                        </span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
