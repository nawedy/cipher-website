"use client";

import React from "react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { cn } from "@/lib/utils";

export function MainNavigation() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-md border-b border-white/10" />
      
      {/* Navigation content */}
      <div className="relative flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo/Brand space */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/logos/logo.png"
            alt="Cipher Intelligence Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="text-slate-100 text-xl font-bold"></span>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-6">
            {/* Services Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-slate-100 hover:text-cyan-400 hover:bg-white/5 transition-all duration-200"
                )}
              >
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px] bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-lg">
                  <NavigationMenuLink
                    className="block p-3 text-slate-100 hover:text-cyan-400 hover:bg-white/5 rounded transition-all duration-200"
                    href="/services/consulting"
                  >
                    <div className="text-sm font-medium">AI Consulting</div>
                    <p className="text-xs text-slate-400 mt-1">Strategic AI implementation guidance</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block p-3 text-slate-100 hover:text-cyan-400 hover:bg-white/5 rounded transition-all duration-200"
                    href="/services/development"
                  >
                    <div className="text-sm font-medium">AI Development</div>
                    <p className="text-xs text-slate-400 mt-1">Custom AI solutions and applications</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block p-3 text-slate-100 hover:text-cyan-400 hover:bg-white/5 rounded transition-all duration-200"
                    href="/services/research"
                  >
                    <div className="text-sm font-medium">AI Research</div>
                    <p className="text-xs text-slate-400 mt-1">Cutting-edge AI research and innovation</p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {/* Products Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-slate-100 hover:text-cyan-400 hover:bg-white/5 transition-all duration-200"
                )}
              >
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px] bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-lg">
                  <NavigationMenuLink
                    className="block p-3 text-slate-100 hover:text-cyan-400 hover:bg-white/5 rounded transition-all duration-200"
                    href="/products/platform"
                  >
                    <div className="text-sm font-medium">AI Platform</div>
                    <p className="text-xs text-slate-400 mt-1">Comprehensive AI development platform</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block p-3 text-slate-100 hover:text-cyan-400 hover:bg-white/5 rounded transition-all duration-200"
                    href="/products/analytics"
                  >
                    <div className="text-sm font-medium">AI Analytics</div>
                    <p className="text-xs text-slate-400 mt-1">Advanced analytics and insights tools</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block p-3 text-slate-100 hover:text-cyan-400 hover:bg-white/5 rounded transition-all duration-200"
                    href="/products/automation"
                  >
                    <div className="text-sm font-medium">AI Automation</div>
                    <p className="text-xs text-slate-400 mt-1">Intelligent automation solutions</p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Industries Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-slate-100 hover:text-cyan-400 hover:bg-white/5 transition-all duration-200"
                )}
              >
                Industries
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px] bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-lg">
                  <NavigationMenuLink
                    className="block p-3 text-slate-100 hover:text-cyan-400 hover:bg-white/5 rounded transition-all duration-200"
                    href="/industries/healthcare"
                  >
                    <div className="text-sm font-medium">Healthcare</div>
                    <p className="text-xs text-slate-400 mt-1">AI solutions for medical and healthcare</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block p-3 text-slate-100 hover:text-cyan-400 hover:bg-white/5 rounded transition-all duration-200"
                    href="/industries/finance"
                  >
                    <div className="text-sm font-medium">Finance</div>
                    <p className="text-xs text-slate-400 mt-1">Financial AI and fintech solutions</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block p-3 text-slate-100 hover:text-cyan-400 hover:bg-white/5 rounded transition-all duration-200"
                    href="/industries/manufacturing"
                  >
                    <div className="text-sm font-medium">Manufacturing</div>
                    <p className="text-xs text-slate-400 mt-1">Industrial AI and automation</p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {/* Resources Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-slate-100 hover:text-cyan-400 hover:bg-white/5 transition-all duration-200"
                )}
              >
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px] bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-lg">
                  <NavigationMenuLink
                    className="block p-3 text-slate-100 hover:text-cyan-400 hover:bg-white/5 rounded transition-all duration-200"
                    href="/resources/blog"
                  >
                    <div className="text-sm font-medium">Blog</div>
                    <p className="text-xs text-slate-400 mt-1">Latest AI insights and articles</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block p-3 text-slate-100 hover:text-cyan-400 hover:bg-white/5 rounded transition-all duration-200"
                    href="/resources/whitepapers"
                  >
                    <div className="text-sm font-medium">Whitepapers</div>
                    <p className="text-xs text-slate-400 mt-1">In-depth research and reports</p>
                  </NavigationMenuLink>
                  <NavigationMenuLink
                    className="block p-3 text-slate-100 hover:text-cyan-400 hover:bg-white/5 rounded transition-all duration-200"
                    href="/resources/case-studies"
                  >
                    <div className="text-sm font-medium">Case Studies</div>
                    <p className="text-xs text-slate-400 mt-1">Real-world AI implementation stories</p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {/* Analytics - Simple Link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-slate-100 hover:text-cyan-400 hover:bg-white/5 transition-all duration-200"
                )}
                href="/analytics"
              >
                Analytics 📊
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Contacts - Simple Link */}
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-slate-100 hover:text-cyan-400 hover:bg-white/5 transition-all duration-200"
                )}
                href="/contacts"
              >
                Contacts
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <ShimmerButton
            className="text-slate-100 border-slate-700/50 hover:border-cyan-400/50 w-[120px]"
            shimmerColor="#22d3ee"
            background="rgba(15, 23, 42, 0.5)"
            borderRadius="8px"
          >
            Sign in
          </ShimmerButton>
          
          <PulsatingButton
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-100 font-medium w-[120px]"
            pulseColor="#22d3ee"
            duration="2s"
          >
            Get Started
          </PulsatingButton>
        </div>
      </div>
    </div>
  );
} 