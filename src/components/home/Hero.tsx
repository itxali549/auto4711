import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/auto711-logo.png';

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
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

          {/* Right Side - Animated Logo */}
          <div className="hidden lg:flex items-center justify-center relative">
            {/* Outer glow ring */}
            <div className="absolute w-[400px] h-[400px] rounded-full border border-primary/20 animate-[spin_20s_linear_infinite]" />
            <div className="absolute w-[350px] h-[350px] rounded-full border border-primary/30 animate-[spin_15s_linear_infinite_reverse]" />
            
            {/* Pulsing glow behind logo */}
            <div className="absolute w-72 h-72 bg-primary/30 rounded-full blur-[80px] animate-[pulse_3s_ease-in-out_infinite]" />
            <div className="absolute w-56 h-56 bg-primary/20 rounded-full blur-[60px] animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
            
            {/* Logo container with floating animation */}
            <div className="relative animate-[float_6s_ease-in-out_infinite] z-10">
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent rounded-full blur-2xl scale-110" />
              
              {/* Logo */}
              <div className="relative p-8 rounded-full bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-primary/30 shadow-[0_0_60px_rgba(220,38,38,0.3)]">
                <img 
                  src={logo} 
                  alt="Auto711 Logo" 
                  className="w-56 h-56 object-contain drop-shadow-[0_0_30px_rgba(220,38,38,0.5)] animate-[logoGlow_3s_ease-in-out_infinite]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
