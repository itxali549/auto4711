import { Link } from 'react-router-dom';
import { Wrench, Settings, Car, Gauge, Thermometer, Battery, Filter, Disc, Phone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/website/Layout';

const services = [
  {
    icon: Wrench,
    title: 'Engine Work',
    description: 'Complete engine repair, overhaul, and rebuilding services',
    features: ['Engine diagnostics', 'Timing belt replacement', 'Head gasket repair', 'Engine rebuild'],
  },
  {
    icon: Settings,
    title: 'Transmission Work',
    description: 'Manual and automatic transmission repair and service',
    features: ['Transmission fluid change', 'Clutch replacement', 'Gear repair', 'Transmission rebuild'],
  },
  {
    icon: Disc,
    title: 'Brake Service',
    description: 'Complete brake system inspection and repair',
    features: ['Brake pad replacement', 'Rotor resurfacing', 'Brake fluid flush', 'ABS diagnostics'],
  },
  {
    icon: Thermometer,
    title: 'AC Repair',
    description: 'Car air conditioning service and repair',
    features: ['AC gas recharge', 'Compressor repair', 'Condenser cleaning', 'Leak detection'],
  },
  {
    icon: Car,
    title: 'Car Maintenance',
    description: 'Regular maintenance to keep your car running smoothly',
    features: ['Oil change', 'Filter replacement', 'Fluid top-up', 'Safety inspection'],
  },
  {
    icon: Gauge,
    title: 'Engine Tune-Up',
    description: 'Performance optimization for better fuel efficiency',
    features: ['Spark plug replacement', 'Ignition timing', 'Fuel system cleaning', 'Emission check'],
  },
  {
    icon: Battery,
    title: 'Electrical Work',
    description: 'Complete auto electrical diagnostics and repair',
    features: ['Battery replacement', 'Alternator repair', 'Starter motor', 'Wiring repair'],
  },
  {
    icon: Filter,
    title: 'Suspension Work',
    description: 'Suspension and steering system repair',
    features: ['Shock absorbers', 'Ball joints', 'Tie rods', 'Wheel alignment'],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
            <p className="text-lg text-gray-600">
              Professional car repair and maintenance services for all Japanese and local vehicles. Quality workmanship at affordable prices.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="bg-white hover:shadow-xl transition-shadow border border-gray-100 group">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-orange-100 group-hover:bg-orange-500 rounded-xl flex items-center justify-center mb-4 transition-colors">
                    <service.icon className="h-7 w-7 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-xl text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialization */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">We Specialize In</h2>
            <p className="text-gray-600">Expert service for Japanese and local vehicles</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Toyota', 'Honda', 'Suzuki', 'Hyundai', 'Kia', 'Nissan', 'Daihatsu', 'Mitsubishi', 'Mazda', 'Lexus', 'Corolla', 'Civic'].map((brand) => (
              <div key={brand} className="bg-white rounded-lg p-4 text-center shadow-sm">
                <span className="font-medium text-gray-700">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a Quote?</h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            Contact us today for a free diagnosis and honest price estimate
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+923032931424">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
                <Phone className="h-5 w-5" />
                Call Now
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
