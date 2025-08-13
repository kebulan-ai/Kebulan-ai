"use client"

import type React from "react"

import { useState } from "react"
import { useDeploymentStore } from "@/lib/deployment/deployment-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Rocket, ExternalLink, AlertCircle } from "lucide-react"
import type { Project } from "@/lib/project-management/types"

interface DeploymentDialogProps {
  project: Project
  trigger?: React.ReactNode
}

export function DeploymentDialog({ project, trigger }: DeploymentDialogProps) {
  const { deployProject, providers, isDeploying } = useDeploymentStore()
  const [isOpen, setIsOpen] = useState(false)
  const [deploymentName, setDeploymentName] = useState(project.name.toLowerCase().replace(/\s+/g, "-"))
  const [selectedProvider, setSelectedProvider] = useState("vercel")

  const connectedProviders = providers.filter((p) => p.isConnected)
  const selectedProviderData = providers.find((p) => p.id === selectedProvider)

  const handleDeploy = async () => {
    try {
      await deployProject(project.id, deploymentName)
      setIsOpen(false)
    } catch (error) {
      console.error("Deployment failed:", error)
    }
  }

  const generateDeploymentName = () => {
    const timestamp = Date.now().toString().slice(-6)
    return `${project.name.toLowerCase().replace(/\s+/g, "-")}-${timestamp}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm">
            <Rocket className="w-4 h-4 mr-2" />
            Deploy
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deploy Project</DialogTitle>
          <DialogDescription>Deploy "{project.name}" to make it accessible on the web</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {connectedProviders.length === 0 ? (
            <div className="text-center py-6">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Deployment Providers Connected</h3>
              <p className="text-sm text-muted-foreground mb-4">Connect a deployment provider to deploy your project</p>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Connect Provider
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="provider">Deployment Provider</Label>
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {connectedProviders.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        <div className="flex items-center space-x-2">
                          <span>{provider.icon}</span>
                          <span>{provider.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedProviderData && (
                  <p className="text-xs text-muted-foreground">{selectedProviderData.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Deployment Name</Label>
                <div className="flex space-x-2">
                  <Input
                    id="name"
                    value={deploymentName}
                    onChange={(e) => setDeploymentName(e.target.value)}
                    placeholder="my-awesome-app"
                  />
                  <Button variant="outline" size="sm" onClick={() => setDeploymentName(generateDeploymentName())}>
                    Generate
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your app will be available at: {deploymentName}.kebulan-apps.com
                </p>
              </div>

              <div className="space-y-2">
                <Label>Project Status</Label>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={project.status === "completed" ? "default" : "secondary"}
                    className={
                      project.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : project.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }
                  >
                    {project.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{project.files.length} files ready</span>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleDeploy} disabled={isDeploying || !deploymentName.trim()}>
                  {isDeploying ? "Deploying..." : "Deploy Project"}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
