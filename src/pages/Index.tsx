import React, { useEffect, useRef } from "react";
import { Eye, Mail, UserCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import MarqueeCompanies from "@/components/MarqueeCompanies";
import ReviewCarousel from "@/components/ReviewCarousel";
import LatestDevelopments from "@/components/LatestDevelopments";
import EnhancedFooter from "@/components/EnhancedFooter";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import ThemeAwareSpline from "@/components/ThemeAwareSpline";


const features = [
  {
    icon: <Eye size={38} strokeWidth={1.8} />,
    title: "Multimodal Input",
    description: "Seamless capture of text, images, and behavioral data for a holistic triage.",
  },
  {
    icon: <UserCheck size={38} strokeWidth={1.8} />,
    title: "Personalized AI",
    description: "AI-driven analysis delivers tailored, actionable recommendations to users.",
  },
  {
    icon: <Mail size={38} strokeWidth={1.8} />,
    title: "Secure Doctor Access",
    description: "Connect safely with professionals only when advanced intervention is needed.",
  },
];

const Index: React.FC = () => {
  const navigate = useNavigate();

  // Add animation to floating elements
  useEffect(() => {
    const animateFloatingElements = () => {
      const elements = document.querySelectorAll('.floating');
      
      elements.forEach((el) => {
        const element = el as HTMLElement;
        
        // Generate more varied motion patterns with slower animation
        // Create random rotation for more dimension
        const randomRotate = Math.random() * 12 - 6; // -6 to 6 degrees rotation (reduced from -7.5 to 7.5)
        
        // Random scale variation (subtle)
        const randomScale = 0.97 + Math.random() * 0.06; // Scale between 0.97 and 1.03 (reduced range)
        
        // Random delay and increased duration for slower animations
        const randomDelay = Math.random() * 2; // Increased from 1.5
        const randomDuration = 3 + Math.random() * 4; // Increased from 1.5 + Math.random() * 2.5
        
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
    <div className="relative min-h-screen dark:from-[#34205e]/50 dark:via-background/60 dark:to-background transition-colors overflow-x-hidden">
      {/* Unique animated SVG ambient background - Removed blue circle */}
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
    
      {/* Animated floating elements - Enhanced with more blue shades */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Blurred gradients - More blue-centric */}
        <div className="floating absolute top-[15%] left-[10%] w-36 h-36 rounded-full bg-gradient-to-br from-blue-400/25 via-sky-300/20 to-cyan-300/15 blur-2xl"></div>
        <div className="floating absolute bottom-[20%] right-[15%] w-48 h-48 rounded-full bg-gradient-to-br from-sky-400/25 via-blue-300/20 to-cyan-300/15 blur-2xl"></div>
        <div className="floating absolute top-[60%] left-[20%] w-32 h-32 rounded-full bg-gradient-to-tl from-blue-400/25 via-sky-300/20 to-cyan-300/15 blur-2xl"></div>
        <div className="floating absolute top-[25%] left-[35%] w-40 h-40 rounded-full bg-gradient-to-tr from-cyan-400/20 via-blue-300/25 to-sky-300/15 blur-2xl"></div>
        <div className="floating absolute bottom-[35%] right-[25%] w-36 h-36 rounded-full bg-gradient-to-bl from-sky-400/20 via-blue-300/25 to-cyan-300/15 blur-2xl"></div>
        <div className="floating absolute top-[38%] right-[38%] w-44 h-44 rounded-full bg-gradient-to-tr from-blue-400/15 via-sky-300/20 to-cyan-300/25 blur-2xl"></div>
        <div className="floating absolute bottom-[55%] left-[40%] w-52 h-52 rounded-full bg-gradient-to-bl from-sky-400/15 via-blue-300/20 to-cyan-300/25 blur-2xl"></div>
        
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

      <Navbar />
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-center h-screen pt-20 md:pt-20 px-4 md:px-12 max-w-6xl mx-auto gap-8 animate-fade-in">
        <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-9 z-10">
          <h1 className="text-4xl md:text-4xl text-[#354745] tracking-widest leading-loose animate-[fade-in_1s_ease-in] dark:text-[#e8f7f6] trasnform -translate-y-2">
            CerebrumAI : Intelligent, Multimodal Triage System
          </h1>
          <p className="text-xl">___</p>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            CerebrumAI is a next-generation,
            multimodal AI system that collects and analyzes patient inputs—including text,
            images, and behavioral data—to deliver personalized triage recommendations.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="group flex items-center gap-2 px-8 py-3 font-semibold rounded-[40px] border-2 border-[#62d5d0] bg-[#62d5d0]/90 hover:bg-[#62d5d0] text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 animate-fade-in"
            >
              Get Started
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center relative t">
          <div className="flex flex-col items-center relative transform -translate-y-10 translate-x-10">
            <ThemeAwareSpline/>
            <div className="absolute bottom-6 right-4 w-[120px] h-[40px] md:w-[180px] rounded-2xl z-20 translate-x-[20%] translate-y-[20%] flex items-center justify-center bg-white dark:bg-card/80 backdrop-blur-lg">
              Cerebrum.ai
            </div>
          </div>
        </div>
      </section>

      {/* Multiple animation keyframes for varied motion patterns */}
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

      {/* Marquee Companies */}
      <MarqueeCompanies />

      {/* Animated overview section */}
      <section className="relative z-1 h-screen flex items-center justify-center px-2 md:px-0   animate-fade-in">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-7 md:gap-10 text-center">
          <h3 className="font-semibold text-2xl md:text-3xl mb-2 dark:text-[#ffffff]">How CerebrumAI Modernizes Digital Triage</h3>
          <p className="text-lg md:text-xl max-w-3xl animate-fade-in">
            CerebrumAI is designed to modernize digital triage through an intelligent, <span className="text-primary hover:scale-105 transition-transform">multimodal approach</span>.<br/>
            By analyzing a combination of <span className="text-primary">textual descriptions</span>, <span className="text-primary">medical images</span>, and <span className="text-primary">behavioral biometrics</span>,
            it delivers context-aware assessments that go beyond conventional symptom checkers—enabling safer and more actionable care journeys.
          </p>
          <img src="/Dna.jpeg" alt="Patient with digital triage screens" className="rounded-2xl shadow-xl border-2 border-primary/10 w-full max-w-md mx-auto animate-scale-in" loading="lazy" draggable={false}/>
        </div>
      </section>

      {/* Review Carousel */}
      <ReviewCarousel />

      {/* Latest Developments */}
      <LatestDevelopments />

      {/* Secure Experience Highlight */}
      <section className="relative h-screen flex items-center justify-center max-w-5xl mx-auto px-4 animate-fade-in ">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="bg-white/80 dark:bg-card/90 w-full md:w-4/6 flex flex-col gap-7 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 backdrop-blur-3xl">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-[#62d5d0]">
                Experience Secure, Intuitive, and Expert Triage
              </h3>
            </div>
            <ul className="list-disc marker:text-[#62d5d0] dark:marker:text-[#62d5d0] text-gray-700 dark:text-gray-200 ml-6 space-y-1 text-base">
              <li>
                <strong>Intelligent AI:</strong> Understands each patient to provide tailored advice.
              </li>
              <li>
                <strong>Privacy First:</strong> We keep your behavioral, text, and image data secure—only connecting you to a doctor if needed.
              </li>
              <li>
                <strong>User-Friendly:</strong> Designed for all, with a beautiful, intuitive experience on any device.
              </li>
              <li>
                <strong>Bridges to Care:</strong> Seamlessly connects you to a professional when your case is complex.
              </li>
            </ul>
          </div>
          <div className="w-full md:w-2/6 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80"
              alt="AI patient triage experience"
              className="rounded-2xl shadow-2xl border-[2.5px] border-[#62d5d0]/50 object-cover animate-scale-in"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
};

export default Index;
