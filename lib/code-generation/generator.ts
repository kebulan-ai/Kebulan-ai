import type { AppTemplate, GeneratedFile, GenerationRequest, GenerationResponse } from "./types"
import { templates } from "./templates"
import { parsePrompt } from "./prompt-parser"
import { generateFromTemplate } from "./template-engine"

export class CodeGenerator {
  async generateCode(request: GenerationRequest): Promise<GenerationResponse> {
    try {
      // Parse the user prompt to understand intent
      const parsedPrompt = parsePrompt(request.prompt)

      // Select appropriate template
      const template = this.selectTemplate(parsedPrompt)

      // Generate code from template
      const files = await generateFromTemplate(template, parsedPrompt, request)

      // Generate AI response message
      const message = this.generateResponseMessage(template, parsedPrompt, files)

      return {
        success: true,
        files,
        message,
        template: template.id,
        metadata: {
          generatedAt: new Date(),
          promptAnalysis: parsedPrompt,
          filesCount: files.length,
        },
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Code generation failed",
        files: [],
        message: "I encountered an error while generating your app. Please try rephrasing your request.",
      }
    }
  }

  private selectTemplate(parsedPrompt: any): AppTemplate {
    // Simple template selection logic based on keywords
    const { keywords, appType, features } = parsedPrompt

    if (keywords.includes("ecommerce") || keywords.includes("store") || keywords.includes("shop")) {
      return templates.ecommerce
    }

    if (keywords.includes("blog") || keywords.includes("cms") || keywords.includes("content")) {
      return templates.blog
    }

    if (keywords.includes("dashboard") || keywords.includes("admin") || keywords.includes("analytics")) {
      return templates.dashboard
    }

    if (keywords.includes("landing") || keywords.includes("marketing") || keywords.includes("website")) {
      return templates.landing
    }

    if (keywords.includes("todo") || keywords.includes("task") || keywords.includes("project")) {
      return templates.todoApp
    }

    if (keywords.includes("chat") || keywords.includes("messaging") || keywords.includes("social")) {
      return templates.chatApp
    }

    // Default to a simple app template
    return templates.simpleApp
  }

  private generateResponseMessage(template: AppTemplate, parsedPrompt: any, files: GeneratedFile[]): string {
    const { appType, features } = parsedPrompt

    let message = `I've created a ${template.name.toLowerCase()} for you! Here's what I've built:\n\n`

    message += `🎯 **Features:**\n`
    template.features.forEach((feature) => {
      message += `- ${feature}\n`
    })

    if (features.length > 0) {
      message += `\n**Custom Features:**\n`
      features.forEach((feature: string) => {
        message += `- ${feature}\n`
      })
    }

    message += `\n**Technical Stack:**\n`
    template.techStack.forEach((tech) => {
      message += `- ${tech}\n`
    })

    message += `\nThe app includes ${files.length} files with a modern, responsive design. You can customize the styling, add more components, or extend the functionality. Would you like me to add any specific features or modify anything?`

    return message
  }
}

export const codeGenerator = new CodeGenerator()
