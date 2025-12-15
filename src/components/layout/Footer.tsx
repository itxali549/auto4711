import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import logo from '@/assets/auto711-logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img 
                src={logo} 
                alt="AUTO 711 Logo" 
                className="h-16 md:h-20 w-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] brightness-150 contrast-125"
              />
              <span className="text-2xl font-heading font-bold tracking-tight">
                Auto<span className="text-primary">711</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium automotive restoration and detailing services in Lahore, Pakistan. 
              Your car deserves the best care.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100057569623243"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/auto711_services/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Services
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Info</h3>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+923037777711"
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Phone className="h-5 w-5 shrink-0 mt-0.5" />
                <span>+92 303 7777711</span>
              </a>
              <a
                href="mailto:hzk.blackberry@gmail.com"
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Mail className="h-5 w-5 shrink-0 mt-0.5" />
                <span>hzk.blackberry@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>DHA Phase 5 Exit, Jammu Stop, Lahore, Pakistan 54000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8">
          <p className="text-center text-muted-foreground text-sm">
            © {currentYear} AUTO 711. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
