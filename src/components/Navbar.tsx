import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { supabase } from '@/lib/supabase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for authentication status
  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
      setLoading(false);

      // Set up auth state listener
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user || null);
        }
      );

      return () => {
        authListener?.subscription.unsubscribe();
      };
    };

    checkUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) setScrolled(true);
      else setScrolled(false);

      if (window.scrollY > lastY && window.scrollY > 96) setShow(false);
      else setShow(true);

      setLastY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [lastY]);

  // Generate user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  // Handle user sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // Create navigation items dynamically based on auth state
  const getNavItems = () => {
    const baseItems = [
      { label: "Home", to: "/" },
      { label: "Why CerebrumAI?", to: "#features" },
      { label: "Medical Dashboard", to: "/dashboard" },
    ];

    // Only show sign in when not authenticated
    if (!user) {
      baseItems.push({ label: "Sign In", to: "/signin" });
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-300
        ${scrolled ? "backdrop-blur-xl bg-white/80 dark:bg-background/80 shadow-[0_2px_16px_-1px_rgba(80,51,150,0.10)] border-b border-gray-200 dark:border-gray-800" : "bg-transparent"}
        ${show ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-24">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <span className="font-semibold text-3xl font-['Varela Round'] flex items-center">
            <span className="text-[#354745] tracking-wider dark:text-[#d0caca]">Cerebrum</span><span className="text-[#62d5d0] tracking-wider">.ai</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) =>
            item.label === "Sign In" ? (
              <Button
                key={item.label}
                onClick={() => navigate(item.to)}
                className="bg-[#62d5d0]/90 hover:bg-[#62d5d0] text-white font-semibold px-5 shadow"
                size="sm"
              >
                {item.label}
                <ArrowRight className="ml-2" size={18} />
              </Button>
            ) : (
              <a
                key={item.label}
                href={item.to}
                className="relative py-1 px-2 group font-medium text-gray-600 dark:text-gray-200 transition 
                  after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 after:rounded-full
                  hover:text-primary after:group-hover:w-full"
              >
                {item.label}
              </a>
            )
          )}

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full" aria-label="Profile">
                  <Avatar className="h-9 w-9 bg-[#62d5d0] text-white hover:ring-2 hover:ring-[#62d5d0]/20">
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="p-2">
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/account')}>
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/history')}>
                  Analysis History
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>
        {/* Mobile buttons */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full" aria-label="Profile">
                  <Avatar className="h-8 w-8 bg-[#62d5d0] text-white">
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="p-2">
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/account')}>
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/history')}>
                  Analysis History
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => navigate("/signin")}
              className="bg-[#62d5d0]/80 hover:bg-[#62d5d0] text-white font-semibold px-4"
              size="sm"
            >
              <ArrowRight size={18} />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;