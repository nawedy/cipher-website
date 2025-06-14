// src/components/divisions/division-layout.tsx
// Shared layout component for all division landing pages with dynamic navigation

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DivisionId, NavigationItem } from '@/types/divisions';
import { getDivisionTheme } from '@/lib/divisions';

interface DivisionLayoutProps {
  children: React.ReactNode;
  divisionId: DivisionId;
  currentPath?: string;
}

const navigationItems: NavigationItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '/about' },
];

const divisionLinks = [
  { id: 'strategy', name: 'Strategy', href: '/divisions/strategy' },
  { id: 'digitalworks', name: 'DigitalWorks', href: '/divisions/digitalworks' },
  { id: 'labs', name: 'Labs', href: '/divisions/labs' },
  { id: 'studio', name: 'Studio', href: '/divisions/studio' },
  { id: 'ai', name: 'AI', href: '/divisions/ai' },
];

export function DivisionLayout({ children, divisionId, currentPath }: DivisionLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const theme = getDivisionTheme(divisionId);

  const currentDivision = divisionLinks.find(d => d.id === divisionId);
  const otherDivisions = divisionLinks.filter(d => d.id !== divisionId);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      {/* Navigation Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300"
        style={{ 
          backgroundColor: `${theme.background}90`,
          borderColor: theme.border
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Division */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: theme.neon, color: theme.background }}
                >
                  C
                </div>
                <span className="font-bold text-lg" style={{ color: theme.textPrimary }}>
                  Cipher Intelligence
                </span>
              </Link>
              
              {currentDivision && (
                <>
                  <div className="text-lg" style={{ color: theme.textSecondary }}>/</div>
                  <Badge 
                    variant="outline"
                    style={{ 
                      borderColor: theme.neon, 
                      color: theme.neon,
                      backgroundColor: `${theme.neon}10`
                    }}
                  >
                    {currentDivision.name}
                  </Badge>
                </>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium transition-colors duration-200 hover:opacity-80"
                  style={{ color: theme.textSecondary }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Division Switcher & CTA */}
            <div className="hidden md:flex items-center gap-4">
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm font-medium"
                  style={{ color: theme.textSecondary }}
                >
                  Other Divisions
                </Button>
                <div 
                  className="absolute top-full right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 backdrop-blur-md border rounded-lg shadow-lg"
                  style={{ 
                    backgroundColor: `${theme.cardBackground}90`,
                    borderColor: theme.border
                  }}
                >
                  <div className="p-2">
                    {otherDivisions.map((division) => (
                      <Link
                        key={division.id}
                        href={division.href}
                        className="block px-3 py-2 text-sm font-medium rounded transition-colors duration-200 hover:opacity-80"
                        style={{ color: theme.textSecondary }}
                      >
                        {division.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                size="sm"
                className="text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: theme.neon,
                  color: theme.background,
                  border: 'none'
                }}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ color: theme.textPrimary }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t backdrop-blur-md"
            style={{ 
              backgroundColor: `${theme.background}95`,
              borderColor: theme.border
            }}
          >
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-base font-medium"
                  style={{ color: theme.textSecondary }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t" style={{ borderColor: theme.border }}>
                <p className="text-sm font-medium mb-3" style={{ color: theme.textSecondary }}>
                  Other Divisions:
                </p>
                {otherDivisions.map((division) => (
                  <Link
                    key={division.id}
                    href={division.href}
                    className="block py-2 text-sm font-medium"
                    style={{ color: theme.textSecondary }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {division.name}
                  </Link>
                ))}
              </div>

              <Button
                className="w-full mt-4 text-sm font-semibold"
                style={{
                  backgroundColor: theme.neon,
                  color: theme.background,
                  border: 'none'
                }}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer 
        className="border-t"
        style={{ 
          backgroundColor: `${theme.primary}10`,
          borderColor: theme.border
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                  style={{ backgroundColor: theme.neon, color: theme.background }}
                >
                  C
                </div>
                <span className="font-bold text-lg" style={{ color: theme.textPrimary }}>
                  Cipher Intelligence
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: theme.textSecondary }}>
                Pioneering AI-powered business solutions across strategy, development, 
                and innovation. Transforming how organizations leverage intelligence for growth.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4" style={{ color: theme.textPrimary }}>
                Divisions
              </h4>
              <ul className="space-y-2">
                {divisionLinks.map((division) => (
                  <li key={division.id}>
                    <Link
                      href={division.href}
                      className="text-sm transition-colors duration-200 hover:opacity-80"
                      style={{ color: theme.textSecondary }}
                    >
                      {division.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4" style={{ color: theme.textPrimary }}>
                Contact
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: theme.textSecondary }}>
                <li>hello@cipherintelligence.com</li>
                <li>+1 (555) 123-4567</li>
                <li>San Francisco, CA</li>
              </ul>
            </div>
          </div>

          <div 
            className="mt-8 pt-8 border-t text-center text-sm"
            style={{ 
              borderColor: theme.border,
              color: theme.textSecondary
            }}
          >
            © 2024 Cipher Intelligence. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}