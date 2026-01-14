import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Facebook, Instagram } from 'lucide-react';
import zbLogo from '@/assets/zb-logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <img src={zbLogo} alt="ZB AutoCare" className="h-12 bg-white rounded p-1" />
            <p className="text-gray-400 text-sm">
              Trusted car mechanic in Karachi with 40+ years of family experience. Experts in engine, transmission & complete car maintenance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Services</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Gallery</Link></li>
              <li><Link to="/testimonials" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Testimonials</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Engine Work</li>
              <li>Transmission Repair</li>
              <li>Brake Service</li>
              <li>Car Maintenance</li>
              <li>Engine Tune-Up</li>
              <li>AC Repair</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>Gulistan-e-Johar Block 12, Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+923032931424" className="hover:text-orange-500 transition-colors">+92 303 2931424</a>
                  <a href="tel:+923331385571" className="hover:text-orange-500 transition-colors">+92 333 1385571</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Clock className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ZB AutoCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
