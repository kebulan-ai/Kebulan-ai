import type { AppTemplate } from "../types"

export const landingTemplate: AppTemplate = {
  name: "Landing Page",
  description: "A modern landing page with hero section, features, and call-to-action",
  files: [
    {
      name: "app/page.tsx",
      content: `import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}`,
    },
    {
      name: "components/landing/header.tsx",
      content: `import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">YourBrand</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  )
}`,
    },
    {
      name: "components/landing/hero.tsx",
      content: `import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from 'lucide-react'

export function Hero() {
  return (
    <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Amazing Products
            <span className="text-blue-600 block">Faster Than Ever</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your ideas into reality with our powerful platform. 
            Join thousands of creators who are building the future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-3">
              Start Building Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
          
          <div className="mt-12">
            <img
              src="/modern-dashboard.png"
              alt="Product Dashboard"
              className="rounded-lg shadow-2xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}`,
    },
    {
      name: "components/landing/features.tsx",
      content: `import { Zap, Shield, Globe, Smartphone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed with modern technologies and optimized performance."
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description: "Enterprise-grade security with end-to-end encryption and compliance."
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Deploy worldwide with our global CDN and edge computing network."
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Responsive design that works perfectly on all devices and screen sizes."
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to help you build, deploy, and scale your applications with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}`,
    },
    {
      name: "components/landing/testimonials.tsx",
      content: `import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    content: "This platform transformed how we build and deploy applications. The speed and reliability are unmatched.",
    initials: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Lead Developer, InnovateCorp",
    content: "The developer experience is fantastic. We've reduced our deployment time by 80% since switching.",
    initials: "MC"
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager, GrowthCo",
    content: "Our team productivity has skyrocketed. The intuitive interface makes complex tasks simple.",
    initials: "ER"
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loved by Developers Worldwide
          </h2>
          <p className="text-xl text-gray-600">
            See what our customers have to say about their experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}`,
    },
    {
      name: "components/landing/cta.tsx",
      content: `import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of developers who are already building amazing things.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600 bg-transparent">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  )
}`,
    },
    {
      name: "components/landing/footer.tsx",
      content: `export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">YourBrand</h3>
            <p className="text-gray-400">
              Building the future of web development, one application at a time.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Features</a></li>
              <li><a href="#" className="hover:text-white">Pricing</a></li>
              <li><a href="#" className="hover:text-white">Documentation</a></li>
              <li><a href="#" className="hover:text-white">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Community</a></li>
              <li><a href="#" className="hover:text-white">Status</a></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 YourBrand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}`,
    },
  ],
}
