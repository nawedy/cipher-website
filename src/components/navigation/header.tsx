// src/components/navigation/header.tsx
// Master navigation header with division switching and responsive mobile menu

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, GradientButton } from "@/components/ui/button";
import { HeaderProps, NavigationItem } from "@/types";
import { divisions, divisionNavigation } from "@/config/divisions";

// Purpose: Main navigation header component with sticky behavior and backdrop blur
export const Header: React.FC<HeaderProps> = ({
  transparent = false,
  division,
  logo = { text: "Cipher Intelligence", href: "/" },
  navigation = [],
  cta = { text: "Get Started", href: "/contact", variant: "gradient" },
  className,
  ...props
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Purpose: Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Purpose: Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, []);

  const headerBackground = transparent
    ? isScrolled
      ? "bg-background/80 backdrop-blur-md border-b border-border/50"
      : "bg-transparent"
    : "bg-background/95 backdrop-blur-md border-b border-border";

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        headerBackground,
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={logo.href} className="flex items-center space-x-2 group">
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-110"
                style={{
                  background: division 
                    ? divisions[division]?.colors.gradient 
                    : divisions.cig.colors.gradient
                }}
              >
                C
              </div>
              <span className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {division ? divisions[division]?.name : logo.text}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {divisionNavigation.map((section) => (
              <div
                key={section.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(section.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
                  <span>{section.label}</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>

                <AnimatePresence>
                  {activeDropdown === section.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-xl overflow-hidden"
                    >
                      <div className="p-2">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center justify-between p-3 rounded-md text-sm transition-colors hover:bg-accent",
                              item.division && "group"
                            )}
                          >
                            <span className="text-foreground">{item.label}</span>
                            {item.division && (
                              <div 
                                className="w-2 h-2 rounded-full transition-opacity group-hover:opacity-100 opacity-60"
                                style={{ 
                                  background: divisions[item.division]?.colors.accent 
                                }}
                              />
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Additional custom navigation items */}
            {navigation.map((item) => (
              <NavigationLink key={item.href} item={item} />
            ))}
          </nav>

          {/* CTA Button and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Emergency OmniPanel Link */}
            <Link 
              href="/omnipanel"
              className="hidden sm:flex items-center px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-all duration-300 text-sm font-medium animate-pulse"
            >
              🚨 OmniPanel Emergency
            </Link>

            {/* CTA Button */}
            <div className="hidden sm:block">
              {division ? (
                <GradientButton division={division}>
                  {cta.text}
                </GradientButton>
              ) : (
                <Button variant={cta.variant === "gradient" ? "default" : cta.variant || "default"}>
                  {cta.text}
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-border mt-4 pt-4 pb-4 overflow-hidden"
            >
              <nav className="space-y-4">
                {/* Emergency OmniPanel Link for Mobile */}
                <Link 
                  href="/omnipanel"
                  className="flex items-center px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-all duration-300 text-sm font-medium animate-pulse"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🚨 OmniPanel Emergency - 72 Hours Left
                </Link>

                {divisionNavigation.map((section) => (
                  <div key={section.label}>
                    <h3 className="font-medium text-foreground mb-3">{section.label}</h3>
                    <div className="space-y-2 ml-4">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between py-2 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span>{item.label}</span>
                          {item.division && (
                            <div 
                              className="w-2 h-2 rounded-full"
                              style={{ 
                                background: divisions[item.division]?.colors.accent 
                              }}
                            />
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Additional custom navigation items */}
                {navigation.map((item) => (
                  <MobileNavigationLink 
                    key={item.href} 
                    item={item} 
                    onClose={() => setIsMobileMenuOpen(false)} 
                  />
                ))}

                {/* Mobile CTA */}
                <div className="pt-4 border-t border-border">
                  {division ? (
                    <GradientButton division={division} className="w-full">
                      {cta.text}
                    </GradientButton>
                  ) : (
                    <Button 
                      variant={cta.variant === "gradient" ? "default" : cta.variant || "default"}
                      className="w-full"
                    >
                      {cta.text}
                    </Button>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

// Purpose: Individual navigation link component with external link handling
const NavigationLink: React.FC<{ item: NavigationItem }> = ({ item }) => {
  const isExternal = item.href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
      >
        <span>{item.label}</span>
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {item.label}
    </Link>
  );
};

// Purpose: Mobile navigation link component with close handler
const MobileNavigationLink: React.FC<{ 
  item: NavigationItem; 
  onClose: () => void;
}> = ({ item, onClose }) => {
  const isExternal = item.href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between py-2 text-muted-foreground hover:text-foreground transition-colors"
        onClick={onClose}
      >
        <span>{item.label}</span>
        <ExternalLink className="h-4 w-4" />
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
      onClick={onClose}
    >
      {item.label}
    </Link>
  );
};

export default Header;