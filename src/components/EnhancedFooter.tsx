import React from "react";
import { Mail, Link, Twitter } from "lucide-react";

const EnhancedFooter = () => (
  <footer className="w-full py-8 bg-[#8efff765] text-black">
    <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">
      {/* Logo and brand */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl font-bold">
          <span className="text-black">Cerebrum</span><span className="text-purple-200">.ai</span>
        </span>
      </div>

      {/* Social links */}
      <div className="flex gap-6 mb-6">
        <a href="#" aria-label="Twitter" className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <Twitter size={20} />
        </a>
        <a href="#" aria-label="LinkedIn" className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <Link size={20} />
        </a>
        <a href="#" aria-label="Contact" className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <Mail size={20} />
        </a>
      </div>
      
      {/* Copyright */}
      <div className="text-sm text-black/80">
        &copy; {new Date().getFullYear()} CerebrumAI Technologies. All rights reserved.
      </div>
    </div>
  </footer>
);

export default EnhancedFooter;
