"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
           <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
             <Input
              id="username"
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
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
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading} variant="default" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {isLoading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            Sign Up
          </Button>
        </div>
      </form>
       <p className="px-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="hover:text-brand underline underline-offset-4"
        >
          Sign In
        </Link>
      </p>
    </div>
  )
}
