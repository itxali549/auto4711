import { Users, Clock, Shield, CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const features = [
  { icon: Users, title: 'Experienced Team', description: 'Skilled technicians with years of expertise' },
  { icon: Clock, title: 'Quick Turnaround', description: 'Efficient service without compromising quality' },
  { icon: Shield, title: 'Guaranteed Work', description: 'All our work is backed by our quality guarantee' },
];

const whyChooseUs = [
  'State-of-the-art equipment',
  'Premium quality products',
  'Attention to detail',
  'Competitive pricing',
  'Customer satisfaction focus',
  'Transparent communication',
  'Timely delivery',
  'After-service support',
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary text-sm font-semibold tracking-wide uppercase mb-4 block">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6">
              Your Trusted Partner in
              <span className="text-gradient block">Automotive Excellence</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              AUTO 711 has been serving Lahore's automotive community with passion and precision.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&auto=format&fit=crop"
                      alt="Auto workshop"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&auto=format&fit=crop"
                      alt="Car detailing"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
                <div className="pt-8">
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=400&auto=format&fit=crop"
                      alt="Mechanic at work"
                      className="w-full h-72 object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Accent decoration */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-48 h-48 bg-primary/10 rounded-xl" />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-6">
                Passion for Perfection
              </h2>
              <div className="space-y-4 text-muted-foreground mb-8">
                <p>
                  At AUTO 711, we believe every vehicle deserves exceptional care. Our team of 
                  skilled professionals brings years of experience and a genuine passion for 
                  automotive excellence to every project.
                </p>
                <p>
                  From routine maintenance to complete restorations, we use only premium products 
                  and state-of-the-art equipment to ensure your vehicle receives the best possible care.
                </p>
                <p>
                  Located in DHA Phase 5, Lahore, we've built our reputation on quality workmanship, 
                  transparent pricing, and exceptional customer service.
                </p>
              </div>

              {/* Features */}
              <div className="grid gap-4">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary text-sm font-semibold tracking-wide uppercase mb-4 block">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight">
              The AUTO 711 Difference
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl card-gradient border border-border"
              >
                <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;