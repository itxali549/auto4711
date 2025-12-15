import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-200" />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in-up opacity-0">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-sm font-medium text-primary">Premium Automotive Care</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6 animate-fade-in-up opacity-0 delay-100">
            Restore Your Car's
            <span className="block text-gradient mt-2">Original Glory</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up opacity-0 delay-200">
            Expert automotive restoration, detailing, and mechanical services in Lahore. 
            We treat every vehicle like it's our own.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up opacity-0 delay-300">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Book an Appointment
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/services">View Our Services</Link>
            </Button>
          </div>

          {/* Phone Contact */}
          <a
            href="tel:+923037777711"
            className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors animate-fade-in-up opacity-0 delay-400"
          >
            <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Call us anytime</p>
              <p className="font-heading font-semibold text-foreground">+92 303 7777711</p>
            </div>
          </a>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;