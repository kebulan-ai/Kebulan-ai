"use client"
import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { ProjectSelector } from "@/components/project-management/project-selector"
import { useProjectStore } from "@/lib/project-management/project-store"
import type { Project } from "@/lib/project-management/types"

function ProjectsContent() {
  const router = useRouter()
  const { setCurrentProject } = useProjectStore()

  const handleProjectSelect = (project: Project) => {
    setCurrentProject(project)
    router.push("/chat")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-cyan-50/30 to-background">
      <div className="container mx-auto py-8">
        <ProjectSelector onProjectSelect={handleProjectSelect} />
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <ProtectedRoute>
      <ProjectsContent />
    </ProtectedRoute>
  )
}
