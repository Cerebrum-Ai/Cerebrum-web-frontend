import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  History,
  User,
  Settings,
  LogOut,
  Bell,
  Stethoscope,
} from "lucide-react";

const AuthenticatedNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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
  }, [lastY]);

  // Generate user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };

  // Handle user sign out
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-300
        ${
          scrolled
            ? "backdrop-blur-xl bg-white/80 dark:bg-background/80 shadow-[0_2px_16px_-1px_rgba(80,51,150,0.10)] border-b border-gray-200 dark:border-gray-800"
            : "bg-transparent"
        }
        ${show ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <span className="font-semibold text-3xl font-['Varela Round'] flex items-center">
              <span className="text-[#354745] tracking-wider dark:text-[#d0caca]">
                Cerebrum
              </span>
              <span className="text-[#62d5d0] tracking-wider">.ai</span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/advice")}
              className="flex items-center gap-2"
            >
              <Stethoscope size={18} />
              Doctor Advice
            </Button>
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full"
                  aria-label="Profile"
                >
                  <Avatar className="h-9 w-9 bg-[#62d5d0] text-white hover:ring-2 hover:ring-[#62d5d0]/20">
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="p-2">
                  <p className="text-sm font-medium">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <LayoutDashboard size={16} className="mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/doctor advice")}>
                  <Stethoscope size={16} className="mr-2" />
                  Doctor Advice
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/account")}>
                  <User size={16} className="mr-2" />
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings size={16} className="mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthenticatedNavbar;
