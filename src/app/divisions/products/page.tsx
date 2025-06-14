// src/app/divisions/products/page.tsx
// Division products overview page

import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products | Cipher Intelligence',
  description: 'Explore our comprehensive range of AI-powered products and solutions across all divisions.',
};

const divisionProducts = [
  {
    division: 'Cipher Strategy',
    slug: 'strategy',
    color: 'bg-green-500',
    products: [
      {
        name: 'Strategic AI Consulting',
        description: 'Comprehensive AI strategy development for enterprises',
        price: 'Custom',
        rating: 4.9,
        features: ['AI Roadmap', 'ROI Analysis', 'Implementation Planning']
      },
      {
        name: 'Market Intelligence Platform',
        description: 'Real-time market analysis and competitive intelligence',
        price: '$2,499/month',
        rating: 4.8,
        features: ['Market Analysis', 'Competitor Tracking', 'Trend Prediction']
      }
    ]
  },
  {
    division: 'Cipher DigitalWorks',
    slug: 'digitalworks',
    color: 'bg-teal-500',
    products: [
      {
        name: 'Digital Transformation Suite',
        description: 'Complete digital transformation platform',
        price: '$4,999/month',
        rating: 4.9,
        features: ['Process Automation', 'Digital Workflows', 'Analytics Dashboard']
      },
      {
        name: 'Cloud Migration Tools',
        description: 'Seamless cloud migration and optimization',
        price: '$1,999/month',
        rating: 4.7,
        features: ['Migration Planning', 'Cost Optimization', 'Security Compliance']
      }
    ]
  },
  {
    division: 'Cipher Labs',
    slug: 'labs',
    color: 'bg-blue-500',
    products: [
      {
        name: 'AI Research Platform',
        description: 'Cutting-edge AI research and development tools',
        price: '$3,499/month',
        rating: 4.8,
        features: ['ML Experiments', 'Model Training', 'Research Collaboration']
      },
      {
        name: 'Innovation Sandbox',
        description: 'Experimental AI solutions and prototyping',
        price: '$1,499/month',
        rating: 4.6,
        features: ['Rapid Prototyping', 'A/B Testing', 'Innovation Metrics']
      }
    ]
  },
  {
    division: 'Cipher Studio',
    slug: 'studio',
    color: 'bg-gray-500',
    products: [
      {
        name: 'Creative AI Suite',
        description: 'AI-powered creative and design tools',
        price: '$999/month',
        rating: 4.7,
        features: ['AI Design', 'Content Generation', 'Brand Consistency']
      },
      {
        name: 'Media Production Platform',
        description: 'Automated media production and optimization',
        price: '$2,999/month',
        rating: 4.8,
        features: ['Video Production', 'Audio Processing', 'Content Optimization']
      }
    ]
  },
  {
    division: 'Cipher AI',
    slug: 'ai',
    color: 'bg-orange-500',
    products: [
      {
        name: 'Enterprise AI Platform',
        description: 'Comprehensive AI solution for enterprises',
        price: '$5,999/month',
        rating: 4.9,
        features: ['Custom Models', 'API Integration', 'Enterprise Support']
      },
      {
        name: 'AI Analytics Engine',
        description: 'Advanced analytics and insights platform',
        price: '$3,999/month',
        rating: 4.8,
        features: ['Predictive Analytics', 'Real-time Insights', 'Custom Dashboards']
      }
    ]
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Products
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of AI-powered products and solutions designed to transform your business across all divisions.
          </p>
        </div>

        {/* Products by Division */}
        <div className="space-y-12">
          {divisionProducts.map((division) => (
            <div key={division.slug} className="space-y-6">
              {/* Division Header */}
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${division.color}`} />
                <h2 className="text-2xl font-bold">{division.division}</h2>
                <Badge variant="outline">
                  {division.products.length} Products
                </Badge>
              </div>

              {/* Products Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {division.products.map((product, idx) => (
                  <Card key={idx} className="relative overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-xl">{product.name}</CardTitle>
                          <p className="text-muted-foreground">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">{product.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Features */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Key Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.features.map((feature, featureIdx) => (
                            <Badge key={featureIdx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Pricing and CTA */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <p className="text-sm text-muted-foreground">Starting at</p>
                          <p className="text-xl font-bold">{product.price}</p>
                        </div>
                        <Button className="gap-2">
                          Learn More
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-muted/50">
            <CardContent className="p-8">
              <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Can't find exactly what you're looking for? Our team can create custom AI solutions tailored to your specific business needs.
              </p>
              <Button size="lg" className="gap-2">
                Contact Sales
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
