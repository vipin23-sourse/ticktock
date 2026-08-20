"use client"

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label' 
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react' 
import React, { useState } from 'react'

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Call NextAuth's dummy credentials provider
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials. Please try again.");
      setIsLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <section className="h-screen">
      <div className="w-full h-full grid grid-cols-2">
        
        {/* Left Form Column */}
        <div className="grid items-center px-72">
          <div className="max-w-xl w-full mx-auto">
            <h1 className="text-black leading-tight text-xl font-bold mb-5">Welcome back</h1>
            
            <form onSubmit={handleLogin}>
              {/* Replaced FieldGroup with standard Tailwind spacing */}
              <div className="space-y-6"> 
                
                {/* Error Display */}
                {error && (
                  <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
                    {error}
                  </div>
                )}

                
                <div className="space-y-2"> 
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox id="remember-me" />
                  <Label 
                    htmlFor="remember-me" 
                    className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </Label>
                </div>
                
                
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
                
              </div>
            </form>
          </div>
        </div>
        
        
        <div className="bg-primary h-full px-72 text-white grid items-center">
          <div className="max-w-xl">
            <h1 className="text-[2.5rem] font-semibold leading-normal mb-3">ticktock</h1>
            <p>
              Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
            </p>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default LoginPage;