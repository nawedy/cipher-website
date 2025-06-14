import { MainNavigation } from "@/components/main-navigation";
import { DoubleFooter } from "@/components/double-footer";

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <MainNavigation />
      <div className="pt-24 md:pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-100 mb-8">Contact Us</h1>
          <p className="text-lg text-slate-300">Contact page content coming soon...</p>
        </div>
      </div>
      <DoubleFooter />
    </div>
  );
} 