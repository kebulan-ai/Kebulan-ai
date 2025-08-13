"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { useProjectStore } from "@/lib/project-management/project-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, FolderOpen, Calendar, Tag } from "lucide-react"
import type { Project } from "@/lib/project-management/types"

interface ProjectSelectorProps {
  onProjectSelect: (project: Project) => void
}

export function ProjectSelector({ onProjectSelect }: ProjectSelectorProps) {
  const { user } = useAuth()
  const { projects, createProject, getProjectsByUser } = useProjectStore()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newProjectName, setNewProjectName] = useState("")
  const [newProjectDescription, setNewProjectDescription] = useState("")
  const [newProjectType, setNewProjectType] = useState<Project["type"]>("simple-app")

  const userProjects = user ? getProjectsByUser(user.id) : []

  const handleCreateProject = async () => {
    if (!user || !newProjectName.trim()) return

    try {
      const project = await createProject(
        {
          name: newProjectName.trim(),
          description: newProjectDescription.trim() || undefined,
          type: newProjectType,
        },
        user.id,
      )

      setIsCreateDialogOpen(false)
      setNewProjectName("")
      setNewProjectDescription("")
      setNewProjectType("simple-app")
      onProjectSelect(project)
    } catch (error) {
      console.error("Failed to create project:", error)
    }
  }

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "deployed":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeLabel = (type: Project["type"]) => {
    switch (type) {
      case "simple-app":
        return "Simple App"
      case "ecommerce":
        return "E-commerce"
      case "blog":
        return "Blog"
      case "dashboard":
        return "Dashboard"
      case "landing":
        return "Landing Page"
      case "todo-app":
        return "Todo App"
      case "chat-app":
        return "Chat App"
      default:
        return "App"
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Your Projects</h2>
          <p className="text-muted-foreground">Select a project to continue working on it</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Start building a new application with AI assistance</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="My Awesome App"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  placeholder="Describe what your app will do..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Project Type</Label>
                <Select value={newProjectType} onValueChange={(value) => setNewProjectType(value as Project["type"])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple-app">Simple App</SelectItem>
                    <SelectItem value="ecommerce">E-commerce Store</SelectItem>
                    <SelectItem value="blog">Blog/CMS</SelectItem>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="landing">Landing Page</SelectItem>
                    <SelectItem value="todo-app">Todo App</SelectItem>
                    <SelectItem value="chat-app">Chat App</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateProject} disabled={!newProjectName.trim()}>
                  Create Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {userProjects.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first project to get started with AI-powered development
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProjects
            .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
            .map((project) => (
              <Card
                key={project.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onProjectSelect(project)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(project.type)}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(project.status)}`}>{project.status}</Badge>
                      </div>
                    </div>
                  </div>
                  {project.description && (
                    <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tag className="w-4 h-4" />
                      <span>{project.files.length} files</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  )
}
