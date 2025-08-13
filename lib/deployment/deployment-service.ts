import type { Deployment, DeploymentRequest, BuildLog } from "./types"

export class DeploymentService {
  private deployments: Map<string, Deployment> = new Map()

  async deploy(request: DeploymentRequest): Promise<Deployment> {
    const deployment: Deployment = {
      id: `deploy_${Date.now()}`,
      projectId: request.projectId,
      name: request.name || `deployment-${Date.now()}`,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
      buildLogs: [],
      environment: request.environment || "production",
    }

    this.deployments.set(deployment.id, deployment)

    // Start the deployment process
    this.startDeployment(deployment)

    return deployment
  }

  private async startDeployment(deployment: Deployment) {
    try {
      // Update status to building
      this.updateDeploymentStatus(deployment.id, "building")
      this.addBuildLog(deployment.id, "info", "Starting deployment...")

      // Simulate build process
      await this.simulateBuildProcess(deployment.id)

      // Generate deployment URL
      const url = `https://${deployment.name}-${deployment.id.slice(-8)}.kebulan-apps.com`

      // Update deployment with success
      const updatedDeployment = this.deployments.get(deployment.id)!
      updatedDeployment.status = "ready"
      updatedDeployment.url = url
      updatedDeployment.updatedAt = new Date()
      updatedDeployment.buildTime = Math.floor(Math.random() * 60) + 30 // 30-90 seconds

      this.addBuildLog(deployment.id, "info", `Deployment ready at ${url}`)
    } catch (error) {
      this.updateDeploymentStatus(deployment.id, "error")
      this.addBuildLog(deployment.id, "error", `Deployment failed: ${error}`)
    }
  }

  private async simulateBuildProcess(deploymentId: string) {
    const steps = [
      "Cloning repository...",
      "Installing dependencies...",
      "Building application...",
      "Optimizing assets...",
      "Deploying to CDN...",
      "Configuring domain...",
    ]

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))
      this.addBuildLog(deploymentId, "info", step)
    }
  }

  private updateDeploymentStatus(deploymentId: string, status: Deployment["status"]) {
    const deployment = this.deployments.get(deploymentId)
    if (deployment) {
      deployment.status = status
      deployment.updatedAt = new Date()
    }
  }

  private addBuildLog(deploymentId: string, level: BuildLog["level"], message: string) {
    const deployment = this.deployments.get(deploymentId)
    if (deployment) {
      deployment.buildLogs.push({
        id: `log_${Date.now()}_${Math.random()}`,
        timestamp: new Date(),
        level,
        message,
      })
    }
  }

  async getDeployment(deploymentId: string): Promise<Deployment | null> {
    return this.deployments.get(deploymentId) || null
  }

  async getProjectDeployments(projectId: string): Promise<Deployment[]> {
    return Array.from(this.deployments.values()).filter((d) => d.projectId === projectId)
  }

  async cancelDeployment(deploymentId: string): Promise<void> {
    const deployment = this.deployments.get(deploymentId)
    if (deployment && (deployment.status === "pending" || deployment.status === "building")) {
      deployment.status = "canceled"
      deployment.updatedAt = new Date()
      this.addBuildLog(deploymentId, "info", "Deployment canceled by user")
    }
  }

  async deleteDeployment(deploymentId: string): Promise<void> {
    this.deployments.delete(deploymentId)
  }
}

export const deploymentService = new DeploymentService()
