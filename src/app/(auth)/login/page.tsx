"use client"

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

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
    <section className="h-screen bg-primary">
      <div className="w-full h-full flex flex-col justify-center items-center md:grid md:grid-cols-2 sm:p-0 p-5">
        {isMobile &&
          <div className='flex items-center justify-center my-4'>
            <h1 className="text-white leading-tight text-xl font-bold">Welcome back</h1>
          </div>
        }

        {/* Left Form Column */}
        <div className="grid items-center w-full h-full px-5 sm:px-20 md:px-30 lg:px-40 xl:px-72 bg-white sm:rounded-none rounded-lg py-6 sm:py-0">
          <div className="max-w-xl w-full mx-auto">
            {!isMobile &&
              <h1 className="text-black leading-tight text-xl font-bold mb-5">Welcome back</h1>
            }

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


        <div className="bg-primary h-full px-4 sm:px-20 md:px-30 lg:px-40 xl:px-72 text-white grid items-center my-auto text-center md:text-left py-6 md:py-0">
          <div className="max-w-xl mx-auto md:mx-0">
            <h1 className="text-lg sm:text-[2.5rem] font-semibold leading-normal mb-3">ticktock</h1>
            <p className='sm:text-normal text-sm'>
              Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage;