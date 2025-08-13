"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useProjectStore } from "@/lib/project-management/project-store"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Plus, Zap, Settings, LogOut, FolderOpen } from "lucide-react"
import { useRouter } from "next/navigation"

function DashboardContent() {
  const { user, signOut } = useAuth()
  const { getProjectsByUser } = useProjectStore()
  const router = useRouter()

  const userProjects = user ? getProjectsByUser(user.id) : []
  const recentProjects = userProjects
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3)

  const handleNewProject = () => {
    router.push("/projects")
  }

  const handleViewAllProjects = () => {
    router.push("/projects")
  }

  const getStatusColor = (status: string) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-cyan-50/30 to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">Kebulan.ai</span>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.firstName} />
              <AvatarFallback>
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">
              {user?.firstName} {user?.lastName}
            </span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName}!</h1>
          <p className="text-muted-foreground">Ready to build something amazing today?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={handleNewProject}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">New Project</h3>
              <p className="text-sm text-muted-foreground">Start building a new app with AI</p>
            </CardContent>
          </Card>

          <Card
            className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={handleViewAllProjects}
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">My Projects</h3>
              <p className="text-sm text-muted-foreground">View and manage all projects</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Templates</h3>
              <p className="text-sm text-muted-foreground">Browse pre-built templates</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Projects</h2>
            <Button variant="outline" onClick={handleViewAllProjects}>
              View All ({userProjects.length})
            </Button>
          </div>

          {recentProjects.length === 0 ? (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first project to get started with AI-powered development
                </p>
                <Button onClick={handleNewProject}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Project
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentProjects.map((project) => (
                <Card
                  key={project.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => router.push("/projects")}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge className={`text-xs ${getStatusColor(project.status)}`}>{project.status}</Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {project.description || "No description provided"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                      <div className="flex items-center space-x-2">
                        <span>{project.files.length} files</span>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
