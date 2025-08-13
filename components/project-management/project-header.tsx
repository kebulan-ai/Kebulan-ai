"use client"

import type React from "react"

import { useState } from "react"
import { useProjectStore } from "@/lib/project-management/project-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MoreHorizontal, Edit, Copy, Trash2, FolderOpen, Save } from "lucide-react"
import type { Project } from "@/lib/project-management/types"

interface ProjectHeaderProps {
  project: Project
  onProjectChange: () => void
}

export function ProjectHeader({ project, onProjectChange }: ProjectHeaderProps) {
  const { updateProject, deleteProject, duplicateProject } = useProjectStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(project.name)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleSaveName = async () => {
    if (editedName.trim() && editedName !== project.name) {
      await updateProject(project.id, { name: editedName.trim() })
    }
    setIsEditing(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveName()
    } else if (e.key === "Escape") {
      setEditedName(project.name)
      setIsEditing(false)
    }
  }

  const handleDuplicate = async () => {
    try {
      await duplicateProject(project.id)
    } catch (error) {
      console.error("Failed to duplicate project:", error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteProject(project.id)
      setIsDeleteDialogOpen(false)
      onProjectChange()
    } catch (error) {
      console.error("Failed to delete project:", error)
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

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onProjectChange}>
            <FolderOpen className="w-4 h-4 mr-2" />
            Switch Project
          </Button>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onBlur={handleSaveName}
                  className="h-8 text-lg font-semibold"
                  autoFocus
                />
                <Button size="sm" onClick={handleSaveName}>
                  <Save className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <h1
                className="text-lg font-semibold cursor-pointer hover:text-primary"
                onClick={() => setIsEditing(true)}
              >
                {project.name}
              </h1>
            )}
            <Badge className={`text-xs ${getStatusColor(project.status)}`}>{project.status}</Badge>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Rename Project
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDuplicate}>
              <Copy className="w-4 h-4 mr-2" />
              Duplicate Project
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{project.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
