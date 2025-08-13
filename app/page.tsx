"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Zap, Globe } from "lucide-react"
import { AfricaLogo } from "@/components/ui/africa-logo"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/dashboard")
    } else {
      router.push("/auth/signup")
    }
  }

  const handleSignIn = () => {
    if (isAuthenticated) {
      router.push("/dashboard")
    } else {
      router.push("/auth/signin")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-cyan-50/30 to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <AfricaLogo className="w-5 h-5 text-primary-foreground" size={20} />
            </div>
            <span className="text-xl font-bold text-primary">Kebulan.ai</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <Button variant="outline" size="sm" onClick={handleSignIn}>
              {isAuthenticated ? "Dashboard" : "Sign In"}
            </Button>
            <Button size="sm" onClick={handleGetStarted}>
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-6 bg-accent/10 text-accent border-accent/20">
            🌍 Proudly African • Built for the World
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Empower Your Vision with AI-Driven App Creation
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Craft innovative applications with cultural relevance and cutting-edge technology. Join a community of
            innovators shaping Africa's digital future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 group" onClick={handleGetStarted}>
              Start Building Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              Watch Demo
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="bg-card border rounded-xl p-8 shadow-2xl">
              <div className="bg-muted rounded-lg p-6 text-left">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-2 text-sm font-mono">
                  <div className="text-accent">{">"} Create a modern e-commerce app</div>
                  <div className="text-muted-foreground">✨ Generating your app...</div>
                  <div className="text-green-600">✓ Components created</div>
                  <div className="text-green-600">✓ Database configured</div>
                  <div className="text-green-600">✓ Ready to deploy</div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Kebulan.ai?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built by Africans, for the world. Experience the future of app development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">AI-Powered Generation</h3>
                <p className="text-muted-foreground">
                  Transform your ideas into fully functional applications with our advanced AI that understands context
                  and culture.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  From concept to deployment in minutes, not months. Our optimized infrastructure ensures rapid
                  development cycles.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Global Ready</h3>
                <p className="text-muted-foreground">
                  Built with African innovation and global standards. Deploy anywhere, scale everywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Trusted by Innovators Across Africa</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-yellow-400 rounded-full"></div>
                ))}
              </div>
              <p className="text-muted-foreground italic">
                "Kebulan.ai helped us build our fintech app in record time. The cultural understanding is unmatched."
              </p>
              <div className="font-semibold">- Amara K., Lagos</div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-yellow-400 rounded-full"></div>
                ))}
              </div>
              <p className="text-muted-foreground italic">
                "Finally, an AI platform that understands our market needs and local context."
              </p>
              <div className="font-semibold">- David M., Nairobi</div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 bg-yellow-400 rounded-full"></div>
                ))}
              </div>
              <p className="text-muted-foreground italic">
                "The speed and quality of development is incredible. We're scaling across 5 countries now."
              </p>
              <div className="font-semibold">- Fatima S., Casablanca</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build the Future?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of developers and entrepreneurs who are already building with Kebulan.ai
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" onClick={handleGetStarted}>
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              onClick={handleSignIn}
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <AfricaLogo className="w-5 h-5 text-primary-foreground" size={20} />
              </div>
              <span className="text-xl font-bold text-primary">Kebulan.ai</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Support
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 Kebulan.ai. Proudly built in Africa for the world. 🌍</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
