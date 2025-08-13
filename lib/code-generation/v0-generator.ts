import { v0 } from "v0-sdk"
import type { GenerationRequest, GenerationResponse, GeneratedFile } from "./types"

export class V0Generator {
  private static instance: V0Generator

  private constructor() {}

  static getInstance(): V0Generator {
    if (!V0Generator.instance) {
      V0Generator.instance = new V0Generator()
    }
    return V0Generator.instance
  }

  async generateCode(request: GenerationRequest): Promise<GenerationResponse> {
    try {
      const chat = await v0.chats.create({
        message: this.buildPrompt(request),
        modelConfiguration: {
          modelId: "v0-1.5-lg",
          imageGenerations: true,
          thinking: false,
        },
        system: "You are an expert React/Next.js developer building modern web applications with Tailwind CSS.",
      })

      // Wait for completion if async
      let completedChat = chat
      if (chat.latestVersion?.status === "pending") {
        // Poll for completion
        completedChat = await this.pollForCompletion(chat.id)
      }

      const files: GeneratedFile[] =
        completedChat.latestVersion?.files?.map((file) => ({
          name: file.name,
          content: file.content,
          language: this.detectLanguage(file.name),
        })) || []

      return {
        success: true,
        files,
        previewUrl: completedChat.latestVersion?.demoUrl || "",
        chatId: completedChat.id,
        versionId: completedChat.latestVersion?.id || "",
      }
    } catch (error) {
      console.error("V0 API Error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate code",
        files: [],
        previewUrl: "",
      }
    }
  }

  private buildPrompt(request: GenerationRequest): string {
    let prompt = request.prompt

    // Add context based on app type
    if (request.appType && request.appType !== "custom") {
      prompt = `Create a ${request.appType} application. ${prompt}`
    }

    // Add styling preferences
    if (request.styling?.primaryColor) {
      prompt += ` Use ${request.styling.primaryColor} as the primary color.`
    }

    if (request.styling?.theme) {
      prompt += ` Apply a ${request.styling.theme} theme.`
    }

    // Add feature requirements
    if (request.features && request.features.length > 0) {
      prompt += ` Include these features: ${request.features.join(", ")}.`
    }

    // Add framework preferences
    prompt += " Use React with Next.js App Router and Tailwind CSS for styling."

    return prompt
  }

  private async pollForCompletion(chatId: string, maxAttempts = 30): Promise<any> {
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Wait 2 seconds

      const chat = await v0.chats.getById({ chatId })

      if (chat.latestVersion?.status === "completed") {
        return chat
      }

      if (chat.latestVersion?.status === "failed") {
        throw new Error("Code generation failed")
      }
    }

    throw new Error("Code generation timed out")
  }

  private detectLanguage(filename: string): string {
    const extension = filename.split(".").pop()?.toLowerCase()

    switch (extension) {
      case "tsx":
      case "jsx":
        return "typescript"
      case "ts":
        return "typescript"
      case "js":
        return "javascript"
      case "css":
        return "css"
      case "json":
        return "json"
      case "md":
        return "markdown"
      default:
        return "text"
    }
  }

  async continueConversation(chatId: string, message: string): Promise<GenerationResponse> {
    try {
      const response = await v0.chats.sendMessage({
        chatId,
        message,
      })

      // Wait for completion if async
      let completedChat = response
      if (response.latestVersion?.status === "pending") {
        completedChat = await this.pollForCompletion(chatId)
      }

      const files: GeneratedFile[] =
        completedChat.latestVersion?.files?.map((file) => ({
          name: file.name,
          content: file.content,
          language: this.detectLanguage(file.name),
        })) || []

      return {
        success: true,
        files,
        previewUrl: completedChat.latestVersion?.demoUrl || "",
        chatId: completedChat.id,
        versionId: completedChat.latestVersion?.id || "",
      }
    } catch (error) {
      console.error("V0 API Error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to continue conversation",
        files: [],
        previewUrl: "",
      }
    }
  }
}
