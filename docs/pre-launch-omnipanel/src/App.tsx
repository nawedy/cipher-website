import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <div className="pt-16">
        <Hero />
        <div id="features">
          <Features />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <FAQ />
        <Footer />
      </div>
    </div>
  );
}

export default App;