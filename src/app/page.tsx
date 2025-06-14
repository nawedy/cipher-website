// src/app/page.tsx
// Master brand homepage showcasing all divisions with interactive elements and conversion optimization

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Brain, 
  TrendingUp, 
  Code, 
  Cpu, 
  Palette, 
  Beaker,
  ArrowRight,
  Users,
  Award,
  Zap,
  Globe,
  Shield,
  BarChart3,
  CheckCircle
} from "lucide-react";

import Header from "@/components/navigation/header";
import { Button, GradientButton, CTAButton } from "@/components/ui-new/button";
import { Card, FeatureCard, TestimonialCard, PricingCard } from "@/components/ui-new/card";
import { 
  BlurFade, 
  TypingAnimation, 
  NumberTicker, 
  Marquee,
  StaggerContainer,
  StaggerItem,
  HoverLift
} from "@/components/ui-new/animations";
import { cn } from "@/lib/utils";
import { divisions, featuredServices, trustIndicators, collaborationExamples } from "@/config/divisions";

// Purpose: Hero section with animated background and compelling value proposition
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-cig-gradient">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]" />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,transparent_12%,rgba(255,255,255,.05)_12.5%,rgba(255,255,255,.05)_87%,transparent_87.5%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <StaggerContainer>
          <StaggerItem>
            <BlurFade delay={0.2}>
              <div className="inline-flex items-center rounded-full border border-cig-accent-primary/20 bg-cig-accent-primary/10 px-4 py-2 text-sm text-cig-accent-primary mb-8">
                <Zap className="mr-2 h-4 w-4" />
                Powered by Unified AI Intelligence
              </div>
            </BlurFade>
          </StaggerItem>

          <StaggerItem>
            <BlurFade delay={0.4}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                <TypingAnimation text="Pioneering Technology," duration={100} />
                <br />
                <span className="bg-gradient-to-r from-cig-accent-primary to-cig-accent-secondary bg-clip-text text-transparent">
                  United Expertise
                </span>
              </h1>
            </BlurFade>
          </StaggerItem>

          <StaggerItem>
            <BlurFade delay={0.6}>
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
                Transform your business with our integrated ecosystem of AI-powered solutions. 
                Six specialized divisions, one unified vision: accelerating your digital future.
              </p>
            </BlurFade>
          </StaggerItem>

          <StaggerItem>
            <BlurFade delay={0.8}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <CTAButton glow pulse>
                  Explore Our Divisions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </CTAButton>
                <Button variant="secondary" size="lg" className="border-white/20 text-white hover:bg-white/10">
                  Watch Demo
                </Button>
              </div>
            </BlurFade>
          </StaggerItem>

          <StaggerItem>
            <BlurFade delay={1.0}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {trustIndicators.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-cig-accent-primary mb-2">
                      <NumberTicker value={parseInt(stat.value.replace(/\D/g, ''))} />
                      {stat.value.match(/\D+/)?.[0]}
                    </div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};

// Purpose: Industry partners showcase with technology logos in marquee animation
const TrustSection = () => {
  return (
    <section className="py-16 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.2}>
          <div className="text-center mb-12">
            <p className="text-muted-foreground text-sm uppercase tracking-wider mb-8">
              Industry Partners
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.4}>
          <Marquee className="py-4" pauseOnHover>
            {trustIndicators.partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center mx-8">
                <a 
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block transition-all duration-300 hover:scale-110"
                >
                  <div className="w-32 h-16 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      width={120}
                      height={60}
                      className="opacity-60 hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert"
                    />
                  </div>
                </a>
              </div>
            ))}
          </Marquee>
        </BlurFade>
      </div>
    </section>
  );
};

// Purpose: Division showcase with interactive cards and hover effects
const DivisionsSection = () => {
  const divisionData = [
    { 
      ...divisions.cs, 
      icon: Brain, 
      color: "from-emerald-600 to-cyan-500",
      delay: 0.2 
    },
    { 
      ...divisions.cdw, 
      icon: TrendingUp, 
      color: "from-teal-500 to-blue-500",
      delay: 0.3 
    },
    { 
      ...divisions.cl, 
      icon: Beaker, 
      color: "from-blue-500 to-purple-600",
      delay: 0.4 
    },
    { 
      ...divisions.cst, 
      icon: Code, 
      color: "from-slate-500 to-blue-500",
      delay: 0.5 
    },
    { 
      ...divisions.cai, 
      icon: Cpu, 
      color: "from-orange-500 to-purple-600",
      delay: 0.6 
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Six Specialized Divisions,
              <span className="block text-primary">One Unified Vision</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each division masters its domain while leveraging collective intelligence 
              to deliver transformative results for your business.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {divisionData.map((division, index) => (
            <BlurFade key={division.id} delay={division.delay}>
              <HoverLift>
                <Link href={division.url}>
                  <Card 
                    variant="glass" 
                    interactive 
                    className="h-full p-8 group cursor-pointer border-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div 
                          className={cn(
                            "p-3 rounded-xl bg-gradient-to-br",
                            division.color,
                            "shadow-lg group-hover:shadow-xl transition-shadow"
                          )}
                        >
                          <division.icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                            Cipher {division.name}
                          </h3>
                          <div 
                            className="w-12 h-1 rounded-full mt-2 bg-gradient-to-r"
                            style={{ background: division.colors.gradient }}
                          />
                        </div>
                      </div>

                      <p className="text-lg font-medium text-primary">
                        {division.tagline}
                      </p>

                      <p className="text-muted-foreground leading-relaxed">
                        {division.description}
                      </p>

                      <div className="space-y-2">
                        <h4 className="font-medium text-foreground">Key Services:</h4>
                        <ul className="space-y-1">
                          {division.services.slice(0, 3).map((service, serviceIndex) => (
                            <li key={serviceIndex} className="flex items-center text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {service}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
                        Explore {division.name}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </HoverLift>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

// Purpose: Featured services showcase with metrics and benefits
const FeaturedServicesSection = () => {
  const iconMap = {
    brain: Brain,
    'trending-up': TrendingUp,
    cpu: Cpu,
    globe: Globe
  };

  return (
    <section className="py-24 bg-gradient-to-br from-background to-background/50">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Accelerate Your Digital Transformation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our integrated approach combines strategy, technology, and innovation 
              to deliver measurable results across every aspect of your business.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {featuredServices.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Brain;
            return (
              <BlurFade key={index} delay={0.3 + index * 0.1}>
                <Card variant="glass" className="p-8 h-full">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div 
                        className="p-3 rounded-xl shadow-lg"
                        style={{
                          background: divisions[service.division]?.colors.gradient
                        }}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-2xl font-bold text-foreground">
                            {service.title}
                          </h3>
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${divisions[service.division]?.colors.accent}20`,
                              color: divisions[service.division]?.colors.accent
                            }}
                          >
                            {divisions[service.division]?.name}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                      {Object.entries(service.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-xl font-bold text-primary mb-1">
                            {value}
                          </div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Purpose: Collaboration examples showing cross-division capabilities
const CollaborationSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              The Power of
              <span className="block text-primary">Unified Intelligence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              When our divisions collaborate, extraordinary things happen. 
              Here are real examples of cross-division projects that transformed businesses.
            </p>
          </div>
        </BlurFade>

        <div className="space-y-8 max-w-5xl mx-auto">
          {collaborationExamples.map((example, index) => (
            <BlurFade key={index} delay={0.3 + index * 0.2}>
              <Card variant="glass" className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      {example.divisions.map((divisionId, divIndex) => (
                        <div
                          key={divIndex}
                          className="w-3 h-3 rounded-full"
                          style={{ 
                            backgroundColor: divisions[divisionId]?.colors.accent 
                          }}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground">
                        {example.duration}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground">
                      {example.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {example.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {example.divisions.map((divisionId) => (
                        <span
                          key={divisionId}
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: `${divisions[divisionId]?.colors.accent}20`,
                            color: divisions[divisionId]?.colors.accent
                          }}
                        >
                          {divisions[divisionId]?.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Key Results:</h4>
                    <ul className="space-y-2">
                      {example.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
};

// Purpose: CTA section with contact form and next steps
const CTASection = () => {
  return (
    <section className="py-24 bg-cig-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,215,0,0.15),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <BlurFade delay={0.2}>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join hundreds of forward-thinking companies that chose Cipher Intelligence 
              to accelerate their digital transformation journey.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <CTAButton glow>
                Schedule Strategic Consultation
              </CTAButton>
              <Button variant="secondary" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Explore Products Marketplace
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <Shield className="h-12 w-12 text-cig-accent-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white">Enterprise Security</h3>
                <p className="text-gray-400 text-sm">SOC 2 compliant with 99.9% uptime guarantee</p>
              </div>
              <div className="space-y-2">
                <Users className="h-12 w-12 text-cig-accent-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white">Expert Team</h3>
                <p className="text-gray-400 text-sm">200+ certified specialists across all divisions</p>
              </div>
              <div className="space-y-2">
                <Award className="h-12 w-12 text-cig-accent-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white">Proven Results</h3>
                <p className="text-gray-400 text-sm">98% client satisfaction with measurable ROI</p>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

// Purpose: Main homepage component orchestrating all sections
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header transparent navigation={[]} />
      <HeroSection />
      <TrustSection />
      <DivisionsSection />
      <FeaturedServicesSection />
      <CollaborationSection />
      <CTASection />
    </main>
  );
}