import type { AppTemplate, GeneratedFile, GenerationRequest, ParsedPrompt } from "./types"

export async function generateFromTemplate(
  template: AppTemplate,
  parsedPrompt: ParsedPrompt,
  request: GenerationRequest,
): Promise<GeneratedFile[]> {
  const context = {
    ...parsedPrompt.customizations,
    features: parsedPrompt.features,
    styling: parsedPrompt.styling,
    complexity: parsedPrompt.complexity,
    prompt: request.prompt,
  }

  const generatedFiles: GeneratedFile[] = []

  for (const templateFile of template.files) {
    let content: string

    if (typeof templateFile.content === "function") {
      content = templateFile.content(context)
    } else {
      content = templateFile.content
    }

    // Apply context-based replacements
    content = applyContextReplacements(content, context)

    generatedFiles.push({
      name: templateFile.name,
      content,
      language: templateFile.language,
      type: templateFile.type,
    })
  }

  // Add common files that all templates need
  generatedFiles.push(...generateCommonFiles(context))

  return generatedFiles
}

function applyContextReplacements(content: string, context: any): string {
  let processedContent = content

  // Replace brand name placeholders
  if (context.brandName) {
    processedContent = processedContent.replace(/\$\{brandName\}/g, context.brandName)
  }

  // Replace color placeholders
  if (context.primaryColor) {
    processedContent = processedContent.replace(/\$\{primaryColor\}/g, context.primaryColor)
  }

  return processedContent
}

function generateCommonFiles(context: any): GeneratedFile[] {
  return [
    {
      name: "lib/utils.ts",
      language: "typescript",
      type: "util",
      content: `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
    },
    {
      name: "tailwind.config.js",
      language: "javascript",
      type: "config",
      content: `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`,
    },
  ]
}
