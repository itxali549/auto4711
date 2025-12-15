import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
      
      {/* Red glow effect on right side */}
      <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
      </div>

      <div className="container relative z-10 px-4 py-20 pt-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/50 bg-primary/10 mb-8 animate-fade-in-up opacity-0">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-sm font-medium text-primary">Premium Automotive Restoration</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6 animate-fade-in-up opacity-0 delay-100">
            Professional{' '}
            <span className="text-primary">Restoration</span>
            <br />
            & <span className="text-primary">Detailing</span> Services
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-in-up opacity-0 delay-200">
            Automotive Restoration Service — Premium detailing, body shop, mechanical 
            work, and custom modifications in Lahore.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-12 animate-fade-in-up opacity-0 delay-300">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">
                Book Your Slot
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Phone Contact */}
          <a
            href="tel:+923037777711"
            className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors animate-fade-in-up opacity-0 delay-400"
          >
            <div className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Call Now</p>
              <p className="font-heading font-semibold text-foreground">+92 303 7777711</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
