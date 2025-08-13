"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Deployment, DeploymentProvider } from "./types"
import { deploymentService } from "./deployment-service"

interface DeploymentStore {
  deployments: Deployment[]
  providers: DeploymentProvider[]
  isDeploying: boolean
  error: string | null

  // Actions
  deployProject: (projectId: string, name?: string) => Promise<Deployment>
  getProjectDeployments: (projectId: string) => Deployment[]
  refreshDeployment: (deploymentId: string) => Promise<void>
  cancelDeployment: (deploymentId: string) => Promise<void>
  deleteDeployment: (deploymentId: string) => Promise<void>
  connectProvider: (providerId: string, config: Record<string, any>) => Promise<void>
  disconnectProvider: (providerId: string) => Promise<void>
}

export const useDeploymentStore = create<DeploymentStore>()(
  persist(
    (set, get) => ({
      deployments: [],
      providers: [
        {
          id: "vercel",
          name: "Vercel",
          icon: "⚡",
          description: "Deploy to Vercel with automatic HTTPS and global CDN",
          isConnected: true, // Mock as connected
        },
        {
          id: "netlify",
          name: "Netlify",
          icon: "🌐",
          description: "Deploy to Netlify with continuous deployment",
          isConnected: false,
        },
        {
          id: "github-pages",
          name: "GitHub Pages",
          icon: "📄",
          description: "Deploy static sites to GitHub Pages",
          isConnected: false,
        },
      ],
      isDeploying: false,
      error: null,

      deployProject: async (projectId: string, name?: string) => {
        set({ isDeploying: true, error: null })

        try {
          const deployment = await deploymentService.deploy({
            projectId,
            name,
            environment: "production",
          })

          set((state) => ({
            deployments: [...state.deployments, deployment],
            isDeploying: false,
          }))

          // Start polling for updates
          const pollInterval = setInterval(async () => {
            const updated = await deploymentService.getDeployment(deployment.id)
            if (updated) {
              set((state) => ({
                deployments: state.deployments.map((d) => (d.id === deployment.id ? updated : d)),
              }))

              if (updated.status === "ready" || updated.status === "error" || updated.status === "canceled") {
                clearInterval(pollInterval)
              }
            }
          }, 2000)

          return deployment
        } catch (error) {
          set({ error: "Failed to deploy project", isDeploying: false })
          throw error
        }
      },

      getProjectDeployments: (projectId: string) => {
        return get().deployments.filter((d) => d.projectId === projectId)
      },

      refreshDeployment: async (deploymentId: string) => {
        const updated = await deploymentService.getDeployment(deploymentId)
        if (updated) {
          set((state) => ({
            deployments: state.deployments.map((d) => (d.id === deploymentId ? updated : d)),
          }))
        }
      },

      cancelDeployment: async (deploymentId: string) => {
        await deploymentService.cancelDeployment(deploymentId)
        await get().refreshDeployment(deploymentId)
      },

      deleteDeployment: async (deploymentId: string) => {
        await deploymentService.deleteDeployment(deploymentId)
        set((state) => ({
          deployments: state.deployments.filter((d) => d.id !== deploymentId),
        }))
      },

      connectProvider: async (providerId: string, config: Record<string, any>) => {
        set((state) => ({
          providers: state.providers.map((p) => (p.id === providerId ? { ...p, isConnected: true, config } : p)),
        }))
      },

      disconnectProvider: async (providerId: string) => {
        set((state) => ({
          providers: state.providers.map((p) =>
            p.id === providerId ? { ...p, isConnected: false, config: undefined } : p,
          ),
        }))
      },
    }),
    {
      name: "kebulan-deployments",
      partialize: (state) => ({
        deployments: state.deployments,
        providers: state.providers,
      }),
    },
  ),
)
