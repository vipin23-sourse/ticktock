"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginFormData } from "./schema";

const LoginForm = () => {
    const router = useRouter();
    const callbackUrl = "/dashboard";
    const [authError, setAuthError] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const rememberMe = watch("rememberMe");

    const onSubmit = async (data: LoginFormData) => {
        setAuthError("");

        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (res?.error) {
            setAuthError("Invalid credentials. Please try again.");
        } else {
            router.push(callbackUrl);
            router.refresh();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
                {/* Error Display */}
                {authError && (
                    <div className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-md">
                        {authError}
                    </div>
                )}

                {/* Email Input */}
                <div className=" relative">
                    <Label className="mb-2" htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-xs font-medium text-red-500 absolute -bottom-5 left-0">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password Input */}
                <div className=" relative">
                    <Label className="mb-2" htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-xs font-medium text-red-500 absolute -bottom-5 left-0">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                        id="remember-me"
                        checked={rememberMe}
                        onCheckedChange={(checked) =>
                            setValue("rememberMe", Boolean(checked))
                        }
                    />
                    <Label
                        htmlFor="remember-me"
                        className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Remember me
                    </Label>
                </div>

                {/* Submit Button */}
                <Button className="w-full cursor-pointer" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Signing in..." : "Sign in"}
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;