import type { AppTemplate } from "../types"

export const simpleAppTemplate: AppTemplate = {
  id: "simple-app",
  name: "Simple App",
  description: "A basic React application with modern styling",
  features: ["Clean, responsive design", "Modern React components", "Tailwind CSS styling", "TypeScript support"],
  techStack: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Lucide Icons"],
  files: [
    {
      name: "app/page.tsx",
      language: "typescript",
      type: "page",
      content: (context) => `import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, ArrowRight, Star } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-${context.primaryColor || "blue"}-50/30 to-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            ${context.brandName || "Your App"}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-${context.primaryColor || "blue"}-600 to-primary bg-clip-text text-transparent">
            Welcome to Your App
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            This is your new application built with modern React and Next.js. 
            Customize it to match your vision and requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Feature One</CardTitle>
              <CardDescription>
                Describe your first amazing feature here. Make it compelling and clear.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-${context.primaryColor || "blue"}-500/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-${context.primaryColor || "blue"}-600" />
              </div>
              <CardTitle>Feature Two</CardTitle>
              <CardDescription>
                Highlight your second key feature. Focus on the value it provides to users.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Feature Three</CardTitle>
              <CardDescription>
                Showcase your third feature. Explain how it makes your app unique.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take the next step and begin your journey with our amazing application.
          </p>
          <Button size="lg">
            Start Now
          </Button>
        </div>
      </div>
    </div>
  )
}`,
    },
    {
      name: "components/ui/button.tsx",
      language: "typescript",
      type: "component",
      content: `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`,
    },
  ],
}
