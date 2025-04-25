
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type SignInValues = z.infer<typeof formSchema>;

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<SignInValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(data: SignInValues) {
    toast({
      title: "Signed in (demo)",
      description: (
        <span>
          Welcome, <b>{data.email}</b>!
        </span>
      ),
    });
    setTimeout(() => navigate("/"), 1200);
  }
// Add animation to floating elements
  useEffect(() => {
    const animateFloatingElements = () => {
      const elements = document.querySelectorAll('.floating');
      
      elements.forEach((el) => {
        const element = el as HTMLElement;
        
        // Generate more varied motion patterns with slower animation
        // Create random rotation for more dimension
        const randomRotate = Math.random() * 12 - 6; // -6 to 6 degrees rotation
        
        // Random scale variation (subtle)
        const randomScale = 0.97 + Math.random() * 0.06; // Scale between 0.97 and 1.03
        
        // Random delay and increased duration for slower animations
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 4;
        
        // Create unique animation name for each element to have different motion paths
        const animationIndex = Math.floor(Math.random() * 5) + 1; // 5 different animations
        
        // Apply animations with varied transforms
        element.style.animation = `float${animationIndex} ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate`;
        element.style.transform = `rotate(${randomRotate}deg) scale(${randomScale})`;
      });
    };
    
    animateFloatingElements();
  }, []);

  return (
    //background animation
    <div className="min-h-screen flex items-center justify-center ">
      <svg 
        className="pointer-events-none fixed w-[135vw] h-[135vw] md:w-[98vw] md:h-[98vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] opacity-55 select-none dark:opacity-20"
        viewBox="0 0 1200 900" 
        fill="none"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {/* Changed colors to cyan/blue shades */}
        <circle className="animate-pulse" cx="970" cy="350" r="69" fill="#a5f3fc" fillOpacity="0.11" />
        <circle cx="160" cy="180" r="70" fill="#67e8f9" fillOpacity="0.16" />
        <circle className="animate-pulse" cx="960" cy="789" r="35" fill="#22d3ee" fillOpacity="0.14" />
        <circle cx="980" cy="170" r="33" fill="#0ea5e9" fillOpacity="0.26" />
        <circle cx="120" cy="730" r="24" fill="#0284c7" fillOpacity="0.19" />
        <circle className="animate-pulse" cx="720" cy="100" r="41" fill="#0891b2" fillOpacity="0.18" />
      </svg>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Blurred gradients - More blue-centric */}
        <div className="floating  absolute top-[15%] left-[10%] w-36 h-36 rounded-full bg-gradient-to-br from-blue-400/25 via-sky-300/20 to-cyan-300/15 blur-2xl"></div>
        <div className="floating  absolute bottom-[20%] right-[15%] w-48 h-48 rounded-full bg-gradient-to-br from-sky-400/25 via-blue-300/20 to-cyan-300/15 blur-2xl"></div>
        <div className="floating  absolute top-[60%] left-[20%] w-32 h-32 rounded-full bg-gradient-to-tl from-blue-400/25 via-sky-300/20 to-cyan-300/15 blur-2xl"></div>
        <div className="floating  absolute top-[25%] left-[35%] w-40 h-40 rounded-full bg-gradient-to-tr from-cyan-400/20 via-blue-300/25 to-sky-300/15 blur-2xl"></div>
        <div className="floating  absolute bottom-[35%] right-[25%] w-36 h-36 rounded-full bg-gradient-to-bl from-sky-400/20 via-blue-300/25 to-cyan-300/15 blur-2xl"></div>
        <div className="floating  absolute top-[38%] right-[38%] w-44 h-44 rounded-full bg-gradient-to-tr from-blue-400/15 via-sky-300/20 to-cyan-300/25 blur-2xl"></div>
        <div className="floating  absolute bottom-[55%] left-[40%] w-52 h-52 rounded-full bg-gradient-to-bl from-sky-400/15 via-blue-300/20 to-cyan-300/25 blur-2xl"></div>
        
        {/* Small particles - Blue focused */}
        <div className="floating absolute top-[30%] right-[30%] w-6 h-6 rounded-full bg-blue-400/30"></div>
        <div className="floating absolute top-[40%] left-[40%] w-4 h-4 rounded-full bg-sky-400/35"></div>
        <div className="floating absolute bottom-[35%] left-[25%] w-5 h-5 rounded-full bg-blue-400/35"></div>
        <div className="floating absolute top-[25%] right-[18%] w-3 h-3 rounded-full bg-sky-400/35"></div>
        <div className="floating absolute bottom-[15%] right-[35%] w-4 h-4 rounded-full bg-cyan-400/35"></div>
        
        {/* Additional particles - More blue variety */}
        <div className="floating absolute top-[18%] right-[45%] w-7 h-7 rounded-full bg-blue-500/25"></div>
        <div className="floating absolute top-[55%] right-[15%] w-5 h-5 rounded-full bg-blue-400/30"></div>
        <div className="floating absolute bottom-[45%] left-[12%] w-6 h-6 rounded-full bg-sky-500/30"></div>
        <div className="floating absolute top-[65%] right-[28%] w-8 h-8 rounded-full bg-blue-400/25"></div>
        <div className="floating absolute top-[12%] left-[25%] w-4 h-4 rounded-full bg-sky-500/30"></div>
        <div className="floating absolute bottom-[25%] left-[45%] w-5 h-5 rounded-full bg-blue-400/25"></div>
        <div className="floating absolute top-[50%] left-[32%] w-3 h-3 rounded-full bg-blue-500/35"></div>
        <div className="floating absolute bottom-[55%] right-[10%] w-6 h-6 rounded-full bg-sky-400/30"></div>
        <div className="floating absolute top-[75%] left-[38%] w-5 h-5 rounded-full bg-blue-400/30"></div>
        <div className="floating absolute bottom-[65%] right-[42%] w-4 h-4 rounded-full bg-sky-500/25"></div>
        
        {/* Medium-sized circles with blue gradients */}
        <div className="floating absolute top-[38%] left-[15%] w-12 h-12 rounded-full bg-gradient-to-r from-blue-600/15 to-blue-400/10"></div>
        <div className="floating absolute bottom-[40%] right-[20%] w-14 h-14 rounded-full bg-gradient-to-r from-sky-600/15 to-blue-400/10"></div>
        <div className="floating absolute top-[15%] right-[25%] w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/15 to-sky-400/10"></div>
        <div className="floating absolute bottom-[22%] left-[30%] w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/15 to-blue-300/10"></div>
        <div className="floating absolute top-[62%] right-[15%] w-14 h-14 rounded-full bg-gradient-to-r from-sky-500/15 to-blue-300/10"></div>
        <div className="floating absolute bottom-[75%] left-[18%] w-12 h-12 rounded-full bg-gradient-to-r from-blue-600/10 to-sky-400/15"></div>
      </div>
      <style>{`
    /* Different animation patterns for more varied motion with slower speed */
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
      transition: transform 0.4s ease-out; /* Increased from 0.2s for smoother transitions */
    }
  `}</style>

      <div className="w-full max-w-md bg-white/80 dark:bg-card/70 shadow-2xl rounded-2xl p-8 flex flex-col gap-6 border border-gray-100 dark:border-gray-800 glass-morphism animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-fuchsia-400 to-emerald-500 dark:from-blue-300 dark:via-fuchsia-200 dark:to-emerald-300">
          Sign In
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        type="email"
                        placeholder="you@email.com"
                        autoComplete="email"
                        className="pl-10 pr-3 py-2"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        type="password"
                        placeholder="Enter password"
                        autoComplete="current-password"
                        className="pl-10 pr-3 py-2"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary/90 hover:bg-primary text-white font-semibold py-2 rounded-md transition-all duration-150 shadow hover:scale-105"
            >
              Sign In
            </Button>
          </form>
        </Form>
        <div className="text-center text-gray-500 text-sm">
          Back to
          <button
            className="ml-2 text-primary hover:underline underline-offset-2"
            onClick={() => navigate("/")}
            tabIndex={0}
            type="button"
          >
            Landing Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
