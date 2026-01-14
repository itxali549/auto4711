import { Link } from 'react-router-dom';
import { Phone, Star, Wrench, Settings, Car, Gauge, Users, Award, Shield, DollarSign, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/website/Layout';
import workshopHero from '@/assets/workshop-hero.png';
import zbLogo from '@/assets/zb-logo.png';

const services = [
  { icon: Wrench, title: 'Engine Work', description: 'Complete engine repair & overhaul' },
  { icon: Settings, title: 'Transmission Work', description: 'Manual & automatic transmission' },
  { icon: Car, title: 'Car Maintenance', description: 'Regular service & maintenance' },
  { icon: Gauge, title: 'Full Engine Tune-Up', description: 'Performance optimization' },
];

const whyChooseUs = [
  { icon: Users, title: '40+ Years Family Experience', description: 'Trusted expertise passed down through generations' },
  { icon: Award, title: 'Expert Technicians', description: 'Skilled mechanics specialized in Japanese & local cars' },
  { icon: Shield, title: 'Honest Diagnosis', description: 'Transparent assessment with no hidden charges' },
  { icon: DollarSign, title: 'Affordable Pricing', description: 'Quality service at competitive rates' },
];

const testimonials = [
  { name: 'Ahmed K.', initial: 'A', text: '"Brakes weaken faster in Karachi due to stop-and-go traffic… amazing work fixing my car!"' },
  { name: 'Imran S.', initial: 'I', text: '"Hyundai Elantra brakes softer — fixed professionally. Highly recommend ZB AutoCare."' },
  { name: 'Farooq M.', initial: 'F', text: '"Toyota Tundra brake repair — excellent service. Best mechanic in Gulistan-e-Johar!"' },
];

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${workshopHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl">
            <img src={zbLogo} alt="ZB AutoCare" className="h-20 md:h-28 mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              35+ Years of Experience in{' '}
              <span className="text-orange-500">Mechanical Work</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Trusted Car Mechanic in Karachi — Experts in Engine, Transmission & Complete Car Maintenance
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <a href="tel:+923032931424">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
                  <Phone className="h-5 w-5" />
                  Call Now
                </Button>
              </a>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                  View Services
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 mt-8 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 w-fit shadow-md">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-bold text-gray-900">5.0</span>
              <span className="text-gray-500">(34+ reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Professional car repair and maintenance services for all Japanese and local vehicles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose ZB AutoCare?</h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              A family-run workshop serving Karachi for over 40 years with dedication and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm mb-4">
              <MapPin className="h-5 w-5 text-orange-500" />
              <span className="font-medium text-gray-900">ZB AutoCare | Gulistan e Johar Block 12</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-bold">5.0</span>
              <span className="text-gray-500">(34+ Google reviews)</span>
            </div>
            <a 
              href="https://share.google/niVDDcV4ADLhQtaeu" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-500 hover:underline text-sm mt-2 inline-block"
            >
              View on Google Maps
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    {testimonial.initial}
                  </div>
                  <p className="text-gray-900 font-medium mb-2">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm italic">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/testimonials">
              <Button variant="link" className="text-orange-500 hover:text-orange-600">
                View All Reviews →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Your Car Fixed?</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            Visit us at Gulistan-e-Johar Block 12 or call us now for expert car repair services
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+923032931424">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
                <Phone className="h-5 w-5" />
                Farhan: +92 303 2931424
              </Button>
            </a>
            <a href="tel:+923331385571">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2">
                <Phone className="h-5 w-5" />
                Zulfiqar: +92 333 1385571
              </Button>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
