import Image from "next/image";
import { MainNavigation } from "@/components/main-navigation";
import { DoubleFooter } from "@/components/double-footer";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <MainNavigation />
      <HeroSection />
      <DoubleFooter />
    </div>
  );
}
