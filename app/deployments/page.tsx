"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useProjectStore } from "@/lib/project-management/project-store"
import { useDeploymentStore } from "@/lib/deployment/deployment-store"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DeploymentStatus } from "@/components/deployment/deployment-status"
import { Sparkles, LogOut, Rocket, Globe, Settings } from "lucide-react"

function DeploymentsContent() {
  const { user, signOut } = useAuth()
  const { getProjectsByUser } = useProjectStore()
  const { deployments, providers } = useDeploymentStore()

  const userProjects = user ? getProjectsByUser(user.id) : []
  const connectedProviders = providers.filter((p) => p.isConnected)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800"
      case "building":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Deployments</h1>
          <p className="text-muted-foreground">Manage and monitor your deployed applications</p>
        </div>

        <Tabs defaultValue="deployments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="deployments" className="flex items-center space-x-2">
              <Rocket className="w-4 h-4" />
              <span>Deployments</span>
            </TabsTrigger>
            <TabsTrigger value="providers" className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>Providers</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deployments" className="space-y-6">
            {deployments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Rocket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Deployments Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Deploy your first project to see it here. Go to any project and click the Deploy button.
                  </p>
                  <Button>
                    <Rocket className="w-4 h-4 mr-2" />
                    Go to Projects
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {userProjects
                  .filter((project) => deployments.some((d) => d.projectId === project.id))
                  .map((project) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>{project.name}</span>
                          <Badge variant="outline">{project.type}</Badge>
                        </CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <DeploymentStatus projectId={project.id} />
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="providers" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <Card key={provider.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{provider.icon}</div>
                        <div>
                          <CardTitle className="text-lg">{provider.name}</CardTitle>
                          <CardDescription className="line-clamp-2">{provider.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={provider.isConnected ? "default" : "secondary"}>
                        {provider.isConnected ? "Connected" : "Not Connected"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-end">
                      <Button variant={provider.isConnected ? "outline" : "default"} size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        {provider.isConnected ? "Configure" : "Connect"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function DeploymentsPage() {
  return (
    <ProtectedRoute>
      <DeploymentsContent />
    </ProtectedRoute>
  )
}
