import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Instagram, Mail } from 'lucide-react';
import logo from '@/assets/zb-logo.png';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img src={logo} alt="ZB AutoCare" className="h-14" />
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Trusted car mechanic shop in Gulistan-e-Johar Karachi with 35+ years of experience 
              in engine, transmission, maintenance & complete car repair.
            </p>
            <p className="text-sm text-muted-foreground italic">
              "محفوظ سفر کی ضمانت"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Engine Work</li>
              <li>Transmission Repair</li>
              <li>Brake Service</li>
              <li>Car Maintenance</li>
              <li>Suspension Work</li>
              <li>Computerized Scanning</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary mt-0.5" />
                <div className="text-muted-foreground">
                  <p>Farhan: +92 303 2931424</p>
                  <p>Zulfiqar: +92 333 1385571</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  D-101 Block 12 Gulistan-e-Johar, Karachi 75290
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Clock className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  Mon – Sun | 10 AM – 7 PM
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Instagram className="w-4 h-4 text-primary mt-0.5" />
                <a
                  href="https://instagram.com/zbautocare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  @zbautocare
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ZB AutoCare. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Best Car Mechanic in Karachi | Engine & Transmission Specialists
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
