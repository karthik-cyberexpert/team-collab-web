"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Icons } from "@/components/icons" // Assuming icons placeholder

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)
  
  // Role-Based Dummy Credentials
  const CREDENTIALS = {
    admin: { email: "admin@example.com", pass: "admin123", role: "Admin" },
    leader: { email: "leader@example.com", pass: "leader123", role: "Team Leader" },
    member: { email: "member@example.com", pass: "member123", role: "Team Member" },
    user: { email: "user@example.com", pass: "user123", role: "User" },
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value
    const password = target.password.value

    setTimeout(() => {
      // Find matching credential
      const matchedUser = Object.values(CREDENTIALS).find(
        (c) => c.email === email && c.pass === password
      );

      if (matchedUser) {
          setIsLoading(false)
          // Store role for demo purposes (in a real app this would be in a context/token)
          if (typeof window !== "undefined") {
            localStorage.setItem("userRole", matchedUser.role);
          }
          router.push("/dashboard")
      } else {
          setIsLoading(false)
          setError("Invalid credentials. Please use one of the demo accounts.")
      }
    }, 1500)
  }

  return (
    <div className="grid gap-6">
      {/* Demo Credentials Hint */}
      <div className="bg-muted/50 border border-border p-4 rounded-lg text-xs space-y-3">
          <p className="font-bold flex items-center gap-2 text-primary">🔐 Demo Roles & Credentials:</p>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
                 <div className="font-bold text-red-500">Admin</div>
                 <div className="font-mono text-muted-foreground">admin@example.com</div>
                 <div className="font-mono text-muted-foreground">admin123</div>
            </div>
            <div>
                 <div className="font-bold text-blue-500">Team Leader</div>
                 <div className="font-mono text-muted-foreground">leader@example.com</div>
                 <div className="font-mono text-muted-foreground">leader123</div>
            </div>
            <div>
                 <div className="font-bold text-green-500">Team Member</div>
                 <div className="font-mono text-muted-foreground">member@example.com</div>
                 <div className="font-mono text-muted-foreground">member123</div>
            </div>
            <div>
                 <div className="font-bold text-yellow-500">Normal User</div>
                 <div className="font-mono text-muted-foreground">user@example.com</div>
                 <div className="font-mono text-muted-foreground">user123</div>
            </div>
          </div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              defaultValue={CREDENTIALS.admin.email} 
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading}
              defaultValue={CREDENTIALS.admin.pass}
            />
          </div>
          
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button disabled={isLoading} variant="default" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {isLoading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            Sign In with Demo Account
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-muted" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Button variant="outline" type="button" disabled={isLoading} onClick={() => alert("GitHub Login Placeholder")}>
           GitHub
        </Button>
         <Button variant="outline" type="button" disabled={isLoading} onClick={() => alert("Google Login Placeholder")}>
           Google
        </Button>
      </div>
       <p className="px-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="hover:text-brand underline underline-offset-4"
        >
          Sign Up
        </Link>
      </p>
    </div>
  )
}
