import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, Mail } from "lucide-react"
import { AfricaLogo } from "@/components/ui/africa-logo"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-cyan-50/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <AfricaLogo className="w-6 h-6 text-primary-foreground" size={24} />
          </div>
          <span className="text-2xl font-bold text-primary">Kebulan.ai</span>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>Start building amazing apps with AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Sign Up */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                <Github className="w-5 h-5 mr-2" />
                Continue with GitHub
              </Button>
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                <Mail className="w-5 h-5 mr-2" />
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Email Sign Up */}
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="John" className="h-11" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Doe" className="h-11" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="h-11" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a strong password" className="h-11" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="h-11"
                  required
                />
              </div>
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary mt-1"
                  required
                />
                <Label htmlFor="terms" className="text-sm leading-5">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Create Account
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          🌍 Join thousands of African innovators building the future
        </div>
      </div>
    </div>
  )
}
