import { Phone, Wrench, Settings, Disc, Car, Gauge, Cpu, Droplet, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Wrench,
    title: 'Engine Work',
    description: 'Complete engine repair, overhaul, and rebuilding services. We diagnose and fix all engine problems including head gasket issues, timing belt replacement, and engine mounts.',
    features: ['Engine Overhaul', 'Head Gasket Repair', 'Timing Belt/Chain', 'Engine Mounts'],
  },
  {
    icon: Settings,
    title: 'Transmission Repair',
    description: 'Expert repair services for both manual and automatic transmissions. We handle complete transmission rebuilds, clutch replacement, and gear issues.',
    features: ['Manual Transmission', 'Automatic Transmission', 'Clutch Replacement', 'Gear Issues'],
  },
  {
    icon: Disc,
    title: 'Brake Service',
    description: 'Complete brake system inspection and repair. From brake pad replacement to rotor resurfacing and brake fluid flush for safe stopping power.',
    features: ['Brake Pads', 'Rotor Replacement', 'Brake Fluid Flush', 'ABS Diagnostics'],
  },
  {
    icon: Car,
    title: 'Suspension Work',
    description: 'Restore your vehicle\'s ride comfort and handling with our suspension services including shocks, struts, ball joints, and steering components.',
    features: ['Shocks & Struts', 'Ball Joints', 'Steering Rack', 'Wheel Alignment'],
  },
  {
    icon: Gauge,
    title: 'Car Maintenance',
    description: 'Regular maintenance services to keep your car running smoothly. Preventive care that extends the life of your vehicle and prevents costly repairs.',
    features: ['Scheduled Service', 'Fluid Checks', 'Belt Inspection', 'Battery Service'],
  },
  {
    icon: Wrench,
    title: 'Full Engine Tune-Up',
    description: 'Comprehensive tune-up service to optimize engine performance. Includes spark plugs, filters, timing adjustment, and performance testing.',
    features: ['Spark Plugs', 'Air Filter', 'Fuel Filter', 'Performance Test'],
  },
  {
    icon: Cpu,
    title: 'Computerized Scanning',
    description: 'Advanced diagnostic scanning to identify issues with modern vehicle systems. We use state-of-the-art equipment to read fault codes accurately.',
    features: ['OBD Diagnostics', 'Fault Code Reading', 'System Analysis', 'ECU Reset'],
  },
  {
    icon: Droplet,
    title: 'Oil & Filter Change',
    description: 'Quick and professional oil change service using quality oils. Regular oil changes are essential for engine longevity and performance.',
    features: ['Engine Oil', 'Oil Filter', 'Multi-grade Options', 'Fluid Top-up'],
  },
];

const Services = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-secondary via-background to-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Professional car repair and maintenance services for all Japanese and local vehicles
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <article 
                key={index}
                className="group bg-card rounded-xl p-6 border border-border/50 card-hover flex flex-col"
              >
                <div className="service-icon mb-4">
                  <service.icon className="w-8 h-8" />
                </div>
                
                <h2 className="font-bold text-xl mb-3">{service.title}</h2>
                
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a 
                  href="tel:+923032931424"
                  className="w-full btn-primary text-center inline-flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a Service Not Listed?
            </h2>
            <p className="text-muted-foreground mb-8">
              We handle all types of car repairs. Contact us to discuss your specific needs 
              and get a free diagnosis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+923032931424" className="btn-primary">
                <Phone className="w-5 h-5 inline mr-2" />
                Farhan: +92 303 2931424
              </a>
              <a href="tel:+923331385571" className="btn-primary">
                <Phone className="w-5 h-5 inline mr-2" />
                Zulfiqar: +92 333 1385571
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
