import type { ParsedPrompt } from "./types"

export function parsePrompt(prompt: string): ParsedPrompt {
  const lowercasePrompt = prompt.toLowerCase()

  // Extract keywords
  const keywords = extractKeywords(lowercasePrompt)

  // Determine app type
  const appType = determineAppType(keywords, lowercasePrompt)

  // Extract features
  const features = extractFeatures(lowercasePrompt)

  // Extract styling preferences
  const styling = extractStyling(lowercasePrompt)

  // Determine complexity
  const complexity = determineComplexity(lowercasePrompt, features)

  // Extract customizations
  const customizations = extractCustomizations(lowercasePrompt)

  return {
    keywords,
    appType,
    features,
    styling,
    complexity,
    customizations,
  }
}

function extractKeywords(prompt: string): string[] {
  const keywordPatterns = [
    "ecommerce",
    "e-commerce",
    "store",
    "shop",
    "marketplace",
    "blog",
    "cms",
    "content",
    "article",
    "post",
    "dashboard",
    "admin",
    "analytics",
    "metrics",
    "landing",
    "marketing",
    "website",
    "homepage",
    "todo",
    "task",
    "project",
    "management",
    "chat",
    "messaging",
    "social",
    "community",
    "portfolio",
    "resume",
    "profile",
    "booking",
    "reservation",
    "appointment",
    "finance",
    "banking",
    "payment",
    "education",
    "learning",
    "course",
  ]

  return keywordPatterns.filter((keyword) => prompt.includes(keyword))
}

function determineAppType(keywords: string[], prompt: string): string {
  if (keywords.some((k) => ["ecommerce", "e-commerce", "store", "shop"].includes(k))) {
    return "ecommerce"
  }
  if (keywords.some((k) => ["blog", "cms", "content"].includes(k))) {
    return "blog"
  }
  if (keywords.some((k) => ["dashboard", "admin", "analytics"].includes(k))) {
    return "dashboard"
  }
  if (keywords.some((k) => ["landing", "marketing", "website"].includes(k))) {
    return "landing"
  }
  if (keywords.some((k) => ["todo", "task", "project"].includes(k))) {
    return "productivity"
  }
  if (keywords.some((k) => ["chat", "messaging", "social"].includes(k))) {
    return "social"
  }

  return "general"
}

function extractFeatures(prompt: string): string[] {
  const features = []

  if (prompt.includes("auth") || prompt.includes("login") || prompt.includes("signup")) {
    features.push("User Authentication")
  }
  if (prompt.includes("payment") || prompt.includes("stripe") || prompt.includes("checkout")) {
    features.push("Payment Integration")
  }
  if (prompt.includes("database") || prompt.includes("data") || prompt.includes("storage")) {
    features.push("Database Integration")
  }
  if (prompt.includes("search") || prompt.includes("filter")) {
    features.push("Search & Filtering")
  }
  if (prompt.includes("responsive") || prompt.includes("mobile")) {
    features.push("Responsive Design")
  }
  if (prompt.includes("dark mode") || prompt.includes("theme")) {
    features.push("Dark Mode Support")
  }
  if (prompt.includes("api") || prompt.includes("backend")) {
    features.push("API Integration")
  }

  return features
}

function extractStyling(prompt: string): string[] {
  const styling = []

  if (prompt.includes("modern") || prompt.includes("contemporary")) {
    styling.push("modern")
  }
  if (prompt.includes("minimal") || prompt.includes("clean")) {
    styling.push("minimal")
  }
  if (prompt.includes("colorful") || prompt.includes("vibrant")) {
    styling.push("colorful")
  }
  if (prompt.includes("professional") || prompt.includes("corporate")) {
    styling.push("professional")
  }
  if (prompt.includes("playful") || prompt.includes("fun")) {
    styling.push("playful")
  }

  return styling.length > 0 ? styling : ["modern"]
}

function determineComplexity(prompt: string, features: string[]): "simple" | "medium" | "complex" {
  let complexityScore = 0

  // Base complexity from prompt length
  if (prompt.length > 200) complexityScore += 2
  else if (prompt.length > 100) complexityScore += 1

  // Complexity from features
  complexityScore += features.length

  // Specific complexity indicators
  if (prompt.includes("complex") || prompt.includes("advanced")) complexityScore += 3
  if (prompt.includes("simple") || prompt.includes("basic")) complexityScore -= 2

  if (complexityScore >= 5) return "complex"
  if (complexityScore >= 2) return "medium"
  return "simple"
}

function extractCustomizations(prompt: string): Record<string, any> {
  const customizations: Record<string, any> = {}

  // Extract colors
  const colorMatch = prompt.match(/(?:color|theme).*?(blue|red|green|purple|orange|pink|yellow|cyan|indigo)/i)
  if (colorMatch) {
    customizations.primaryColor = colorMatch[1].toLowerCase()
  }

  // Extract company/brand name
  const brandMatch = prompt.match(/(?:for|called|named)\s+([A-Z][a-zA-Z\s]+)/i)
  if (brandMatch) {
    customizations.brandName = brandMatch[1].trim()
  }

  return customizations
}
