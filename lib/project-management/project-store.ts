"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Project, CreateProjectRequest, UpdateProjectRequest, ProjectFile, ChatMessage } from "./types"

interface ProjectStore {
  projects: Project[]
  currentProject: Project | null
  isLoading: boolean
  error: string | null

  // Actions
  createProject: (request: CreateProjectRequest, userId: string) => Promise<Project>
  updateProject: (projectId: string, updates: UpdateProjectRequest) => Promise<void>
  deleteProject: (projectId: string) => Promise<void>
  setCurrentProject: (project: Project | null) => void
  addMessage: (projectId: string, message: ChatMessage) => void
  updateFiles: (projectId: string, files: ProjectFile[]) => void
  getProjectsByUser: (userId: string) => Project[]
  duplicateProject: (projectId: string) => Promise<Project>
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProject: null,
      isLoading: false,
      error: null,

      createProject: async (request: CreateProjectRequest, userId: string) => {
        set({ isLoading: true, error: null })

        try {
          const newProject: Project = {
            id: `project_${Date.now()}`,
            name: request.name,
            description: request.description,
            type: request.type || "simple-app",
            status: "draft",
            createdAt: new Date(),
            updatedAt: new Date(),
            userId,
            files: [],
            messages: [],
            deployments: [],
          }

          set((state) => ({
            projects: [...state.projects, newProject],
            currentProject: newProject,
            isLoading: false,
          }))

          return newProject
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to create project",
            isLoading: false,
          })
          throw error
        }
      },

      updateProject: async (projectId: string, updates: UpdateProjectRequest) => {
        set({ isLoading: true, error: null })

        try {
          set((state) => ({
            projects: state.projects.map((project) =>
              project.id === projectId ? { ...project, ...updates, updatedAt: new Date() } : project,
            ),
            currentProject:
              state.currentProject?.id === projectId
                ? { ...state.currentProject, ...updates, updatedAt: new Date() }
                : state.currentProject,
            isLoading: false,
          }))
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to update project",
            isLoading: false,
          })
          throw error
        }
      },

      deleteProject: async (projectId: string) => {
        set({ isLoading: true, error: null })

        try {
          set((state) => ({
            projects: state.projects.filter((project) => project.id !== projectId),
            currentProject: state.currentProject?.id === projectId ? null : state.currentProject,
            isLoading: false,
          }))
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to delete project",
            isLoading: false,
          })
          throw error
        }
      },

      setCurrentProject: (project: Project | null) => {
        set({ currentProject: project })
      },

      addMessage: (projectId: string, message: ChatMessage) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? { ...project, messages: [...project.messages, message], updatedAt: new Date() }
              : project,
          ),
          currentProject:
            state.currentProject?.id === projectId
              ? {
                  ...state.currentProject,
                  messages: [...state.currentProject.messages, message],
                  updatedAt: new Date(),
                }
              : state.currentProject,
        }))
      },

      updateFiles: (projectId: string, files: ProjectFile[]) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId ? { ...project, files, updatedAt: new Date() } : project,
          ),
          currentProject:
            state.currentProject?.id === projectId
              ? { ...state.currentProject, files, updatedAt: new Date() }
              : state.currentProject,
        }))
      },

      getProjectsByUser: (userId: string) => {
        return get().projects.filter((project) => project.userId === userId)
      },

      duplicateProject: async (projectId: string) => {
        const { projects, createProject } = get()
        const originalProject = projects.find((p) => p.id === projectId)

        if (!originalProject) {
          throw new Error("Project not found")
        }

        const duplicatedProject = await createProject(
          {
            name: `${originalProject.name} (Copy)`,
            description: originalProject.description,
            type: originalProject.type,
          },
          originalProject.userId,
        )

        // Copy files and messages
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === duplicatedProject.id
              ? {
                  ...project,
                  files: [...originalProject.files],
                  messages: [...originalProject.messages],
                }
              : project,
          ),
        }))

        return duplicatedProject
      },
    }),
    {
      name: "kebulan-project-store",
      partialize: (state) => ({
        projects: state.projects,
        currentProject: state.currentProject,
      }),
    },
  ),
)
