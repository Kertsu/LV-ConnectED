import React, { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from "react-router-dom";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import SignInDialog from "./SignInDialog";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/home");
  };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Whats", href: "#whats" },
    { name: "Questions", href: "#question" },
  ];

  return (
    <header className=" z-50 sticky top-0 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#0038a9] via-[#ce1127] to-[#f5ce31] bg-clip-text text-transparent">
            ConnectED 
          </h1>

          {/* Desktop Menu */}
          <DesktopMenu navItems={navItems} />

          {/* Mobile Menu */}
          <MobileMenu
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            navItems={navItems}
          />

          <div className="items-center space-x-4 hidden md:flex">
            <ModeToggle />
            <SignInDialog
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
