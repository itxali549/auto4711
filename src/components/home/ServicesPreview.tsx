import { Link } from 'react-router-dom';
import { Sparkles, Droplets, Car, Paintbrush, Wrench, Settings, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Sparkles,
    title: 'Detailing',
    description: 'Professional interior and exterior detailing to make your car shine like new.',
  },
  {
    icon: Droplets,
    title: 'Oil Change',
    description: 'Quality oil changes with premium products to keep your engine running smoothly.',
  },
  {
    icon: Car,
    title: 'Car Wash',
    description: 'Thorough hand wash and cleaning services for a spotless finish.',
  },
  {
    icon: Paintbrush,
    title: 'Body Shop',
    description: 'Expert collision repair, dent removal, and paint restoration services.',
  },
  {
    icon: Wrench,
    title: 'Mechanical',
    description: 'Complete mechanical repairs and maintenance by certified technicians.',
  },
  {
    icon: Settings,
    title: 'Restoration',
    description: 'Full vehicle restoration to bring classic and vintage cars back to life.',
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold tracking-wide uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-6">
            What We Offer
          </h2>
          <p className="text-muted-foreground text-lg">
            From routine maintenance to complete restoration, we provide comprehensive automotive care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group card-gradient border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;