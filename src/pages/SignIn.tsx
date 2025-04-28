import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SignIn = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setMessage('')
        setIsError(false)
        setIsLoading(true)
        
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            
            if (error) {
                setIsError(true)
                setMessage(error.message)
            } else {
                navigate('/input')
            }
        } catch (err) {
            setIsError(true)
            setMessage('An unexpected error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    // Add animation to floating elements
    useEffect(() => {
        const animateFloatingElements = () => {
            const elements = document.querySelectorAll('.floating')
            
            elements.forEach((el) => {
                const element = el as HTMLElement
                
                // Random parameters for varied animations
                const randomRotate = Math.random() * 12 - 6
                const randomScale = 0.97 + Math.random() * 0.06
                const randomDelay = Math.random() * 2
                const randomDuration = 3 + Math.random() * 4
                const animationIndex = Math.floor(Math.random() * 5) + 1
                
                element.style.animation = `float${animationIndex} ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate`
                element.style.transform = `rotate(${randomRotate}deg) scale(${randomScale})`
            })
        }
        
        animateFloatingElements()
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            {/* Background decoration */}
            <svg 
                className="pointer-events-none fixed w-[135vw] h-[135vw] md:w-[98vw] md:h-[98vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] opacity-55 select-none dark:opacity-20"
                viewBox="0 0 1200 900" 
                fill="none"
            >
                <circle className="animate-pulse" cx="970" cy="350" r="69" fill="#a5f3fc" fillOpacity="0.11" />
                <circle cx="160" cy="180" r="70" fill="#67e8f9" fillOpacity="0.16" />
                <circle className="animate-pulse" cx="960" cy="789" r="35" fill="#22d3ee" fillOpacity="0.14" />
                <circle cx="980" cy="170" r="33" fill="#0ea5e9" fillOpacity="0.26" />
                <circle cx="120" cy="730" r="24" fill="#0284c7" fillOpacity="0.19" />
                <circle className="animate-pulse" cx="720" cy="100" r="41" fill="#0891b2" fillOpacity="0.18" />
            </svg>
            
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Blurred gradients */}
                <div className="floating absolute top-[15%] left-[10%] w-36 h-36 rounded-full bg-gradient-to-br from-blue-400/25 via-sky-300/20 to-cyan-300/15 blur-2xl"></div>
                <div className="floating absolute bottom-[20%] right-[15%] w-48 h-48 rounded-full bg-gradient-to-br from-sky-400/25 via-blue-300/20 to-cyan-300/15 blur-2xl"></div>
                <div className="floating absolute top-[60%] left-[20%] w-32 h-32 rounded-full bg-gradient-to-tl from-blue-400/25 via-sky-300/20 to-cyan-300/15 blur-2xl"></div>
                
                {/* Small particles */}
                <div className="floating absolute top-[30%] right-[30%] w-6 h-6 rounded-full bg-blue-400/30"></div>
                <div className="floating absolute top-[40%] left-[40%] w-4 h-4 rounded-full bg-sky-400/35"></div>
                <div className="floating absolute bottom-[35%] left-[25%] w-5 h-5 rounded-full bg-blue-400/35"></div>
                <div className="floating absolute top-[25%] right-[18%] w-3 h-3 rounded-full bg-sky-400/35"></div>
                <div className="floating absolute bottom-[15%] right-[35%] w-4 h-4 rounded-full bg-cyan-400/35"></div>
            </div>
            
            <style>
                {`
                /* Animation patterns for floating elements */
                @keyframes float1 {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(8px, -12px) rotate(2deg); }
                    66% { transform: translate(-10px, -3px) rotate(-1deg); }
                    100% { transform: translate(5px, 10px) rotate(1.5deg); }
                }
                
                @keyframes float2 {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    25% { transform: translate(-14px, 7px) rotate(-2deg); }
                    75% { transform: translate(7px, 14px) rotate(0.5deg); }
                    100% { transform: translate(10px, -10px) rotate(1.5deg); }
                }
                
                @keyframes float3 {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    20% { transform: translate(10px, 10px) rotate(3deg); }
                    40% { transform: translate(-15px, 7px) rotate(-1.5deg); }
                    60% { transform: translate(0px, -18px) rotate(0deg); }
                    80% { transform: translate(12px, -7px) rotate(2deg); }
                    100% { transform: translate(-7px, 0px) rotate(-2deg); }
                }
                
                @keyframes float4 {
                    0% { transform: translate(0, 0) rotate(0deg) scale(1); }
                    30% { transform: translate(7px, -16px) rotate(3deg) scale(1.02); }
                    70% { transform: translate(-14px, -7px) rotate(-3deg) scale(0.99); }
                    100% { transform: translate(10px, 10px) rotate(1.5deg) scale(1.01); }
                }
                
                @keyframes float5 {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    33% { transform: translate(-10px, -13px) rotate(-3.5deg); }
                    67% { transform: translate(18px, -3px) rotate(2deg); }
                    100% { transform: translate(-5px, 12px) rotate(-1.5deg); }
                }
                
                .floating {
                    will-change: transform;
                    transition: transform 0.4s ease-out;
                }
                `}
            </style>
            
            {/* Card container */}
            <div className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-100 dark:border-gray-800 relative z-10">
                <h2 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 dark:from-blue-300 dark:via-blue-400 dark:to-cyan-300">
                    Welcome Back
                </h2>
                
                {message && (
                    <Alert variant={isError ? "destructive" : "default"} className="mb-6">
                        {isError && <AlertCircle className="h-4 w-4 mr-2" />}
                        <AlertDescription>{message}</AlertDescription>
                    </Alert>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                className="pl-10 pr-3 py-2 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium">Password</label>
                            <a
                                href="#"
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                                onClick={(e) => {
                                    e.preventDefault()
                                    alert('Password reset functionality coming soon!')
                                }}
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pl-10 pr-10 py-2 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    
                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 rounded-md transition-all duration-200 shadow-md hover:shadow-lg mt-4"
                        disabled={isLoading}             >
                        {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                
                    <div className="flex justify-between items-center text-sm mt-6">
                        <button
                            className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                            onClick={() => navigate("/")}
                            type="button"
                            disabled={isLoading}
                        >
                            <ArrowLeft size={16} className="mr-1" />
                            Back to Home
                        </button>
                        
                        <div className="text-gray-600 dark:text-gray-300">
                            Don't have an account?{" "}
                            <Link 
                                to="/signup" 
                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn