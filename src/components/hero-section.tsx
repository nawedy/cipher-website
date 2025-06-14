"use client";

import React from "react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 md:pt-32">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900 pointer-events-none" />
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Animated Gradient Text */}
        <div className="mb-8">
          <AnimatedGradientText
            className="text-lg sm:text-xl font-medium"
            colorFrom="#22d3ee"
            colorTo="#a3e635"
            speed={1.5}
          >
            🚀 Introducing the Future of AI Intelligence
          </AnimatedGradientText>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-100 leading-tight mb-6">
          Meet your AI Agent
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-lime-400 to-yellow-400 bg-clip-text text-transparent">
            Streamline your workflow
          </span>
        </h1>

        {/* Sub-heading */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          AI assistant designed to streamline your digital workflows and handle mundane tasks, 
          so you can focus on what truly matters. Transform your business with intelligent automation 
          and cutting-edge AI solutions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <PulsatingButton
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-100 font-medium px-8 py-3 text-lg w-full sm:w-auto"
            pulseColor="#22d3ee"
            duration="2s"
          >
            Get Started
          </PulsatingButton>
          
          <ShimmerButton
            className="text-slate-100 border-slate-700/50 hover:border-cyan-400/50 px-8 py-3 text-lg w-full sm:w-auto"
            shimmerColor="#22d3ee"
            background="rgba(15, 23, 42, 0.5)"
            borderRadius="8px"
          >
            Learn More
          </ShimmerButton>
        </div>

        {/* Hero Video Dialog */}
        <div className="max-w-7xl mx-auto w-full">
          <HeroVideoDialog
            animationStyle="from-center"
            videoSrc="/videos/trippy.mp4"
            thumbnailSrc="/videos/neon-thumbnail.svg"
            thumbnailAlt="Cipher Intelligence AI Demo"
            className="rounded-2xl shadow-2xl border border-white/10"
          />
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
    </section>
  );
} 