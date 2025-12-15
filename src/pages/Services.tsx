import { Link } from 'react-router-dom';
import { Sparkles, Droplets, Car, Paintbrush, Wrench, Settings, PenTool, Cog, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const services = [
  {
    icon: Sparkles,
    title: 'Detailing',
    description: 'Complete interior and exterior detailing to restore your vehicles showroom shine.',
    features: ['Deep interior cleaning', 'Paint correction', 'Ceramic coating', 'Leather treatment'],
  },
  {
    icon: Droplets,
    title: 'Oil Change',
    description: 'Professional oil change service using premium quality oils and filters.',
    features: ['Synthetic oil options', 'Filter replacement', 'Fluid top-up', 'Multi-point inspection'],
  },
  {
    icon: Car,
    title: 'Car Wash',
    description: 'Thorough hand wash and cleaning for a spotless, streak-free finish.',
    features: ['Hand wash', 'Wheel cleaning', 'Interior vacuum', 'Window cleaning'],
  },
  {
    icon: Paintbrush,
    title: 'Baked Paint Booth',
    description: 'Factory-quality paint jobs with our state-of-the-art baked paint booth.',
    features: ['Color matching', 'Clear coat finish', 'Rust protection', 'Professional prep'],
  },
  {
    icon: PenTool,
    title: 'Body Shop',
    description: 'Expert collision repair and bodywork to restore your vehicle to perfection.',
    features: ['Dent removal', 'Panel replacement', 'Frame straightening', 'Scratch repair'],
  },
  {
    icon: Wrench,
    title: 'Mechanical',
    description: 'Comprehensive mechanical repairs and maintenance services.',
    features: ['Engine diagnostics', 'Brake service', 'Suspension work', 'AC service'],
  },
  {
    icon: Settings,
    title: 'Restoration',
    description: 'Full vehicle restoration bringing classic and vintage cars back to life.',
    features: ['Complete rebuild', 'Rust repair', 'Chrome restoration', 'Upholstery work'],
  },
  {
    icon: Cog,
    title: 'Modification',
    description: 'Custom modifications to enhance performance and aesthetics.',
    features: ['Performance upgrades', 'Body kits', 'Audio systems', 'Lighting upgrades'],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary text-sm font-semibold tracking-wide uppercase mb-4 block">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6">
              Complete Automotive
              <span className="text-gradient block">Care Solutions</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              From routine maintenance to complete restoration, we offer a full range of services 
              to keep your vehicle in perfect condition.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="group card-gradient border border-border rounded-xl p-8 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-heading font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-red">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight mb-6 text-primary-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Contact us today to schedule an appointment or get a free quote for your vehicle.
            </p>
            <Button asChild variant="heroOutline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link to="/contact">
                Contact Us Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;