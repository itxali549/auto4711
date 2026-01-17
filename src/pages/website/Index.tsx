import { Link } from 'react-router-dom';
import { 
  Wrench, Settings, Car, Gauge, Shield, Users, 
  ThumbsUp, DollarSign, Star, Phone, CheckCircle 
} from 'lucide-react';
import logo from '@/assets/zb-logo.png';

const services = [
  { icon: Wrench, title: 'Engine Work', desc: 'Complete engine repair & overhaul' },
  { icon: Settings, title: 'Transmission Work', desc: 'Manual & automatic transmission' },
  { icon: Car, title: 'Car Maintenance', desc: 'Regular service & maintenance' },
  { icon: Gauge, title: 'Full Engine Tune-Up', desc: 'Performance optimization' },
];

const whyChooseUs = [
  { icon: Shield, title: '40+ Years Family Experience', desc: 'Trusted expertise passed down through generations' },
  { icon: Users, title: 'Expert Technicians', desc: 'Skilled mechanics specialized in Japanese & local cars' },
  { icon: ThumbsUp, title: 'Honest Diagnosis', desc: 'Transparent assessment with no hidden charges' },
  { icon: DollarSign, title: 'Affordable Pricing', desc: 'Quality service at competitive rates' },
];

const reviews = [
  { name: 'Ahmed K.', text: 'Brakes weaken faster in Karachi due to stop-and-go traffic… amazing work fixing my car!', rating: 5 },
  { name: 'Imran S.', text: 'Hyundai Elantra brakes softer — fixed professionally. Highly recommend ZB AutoCare.', rating: 5 },
  { name: 'Farooq M.', text: 'Toyota Tundra brake repair — excellent service. Best mechanic in Gulistan-e-Johar!', rating: 5 },
  { name: 'Hassan R.', text: 'Engine was overheating, they diagnosed head gasket issue immediately. Honest work!', rating: 5 },
  { name: 'Bilal A.', text: 'My Cultus runs like new after their full tune-up. Very satisfied with the service.', rating: 5 },
];

const Index = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-secondary to-background">
        <div className="container-custom">
          <div className="max-w-2xl">
            {/* Content */}
            <div className="text-left animate-slide-up">
              <img src={logo} alt="ZB AutoCare" className="h-20 md:h-28 mb-6" />
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                35+ Years of Experience in{' '}
                <span className="text-gradient">Mechanical Work</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-xl">
                Trusted Car Mechanic in Karachi — Experts in Engine, Transmission & Complete Car Maintenance
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <a href="tel:+923032931424" className="btn-primary inline-flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <Link to="/services" className="btn-outline inline-flex items-center justify-center">
                  View Services
                </Link>
              </div>
              
              {/* Floating badge */}
              <div className="inline-flex mt-8 bg-card/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-border">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="font-bold">5.0</span>
                  <span className="text-muted-foreground text-sm">(34+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Service Icons */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional car repair and maintenance services for all Japanese and local vehicles
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-background rounded-xl p-6 text-center card-hover border border-border/50"
              >
                <div className="service-icon mx-auto mb-4">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
                <CheckCircle className="w-5 h-5 text-primary mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ZB AutoCare?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A family-run workshop serving Karachi for over 40 years with dedication and expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl p-6 border border-border/50 card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Business Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="bg-background rounded-2xl p-8 md:p-12 shadow-lg border border-border">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  ZB AutoCare | Gulistan e Johar Block 12
                </h2>
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="font-bold text-lg">5.0</span>
                  <span className="text-muted-foreground">(34+ Google reviews)</span>
                </div>
              </div>
              <a 
                href="https://share.google/niVDDcV4ADLhQtaeu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline whitespace-nowrap"
              >
                View on Google Maps
              </a>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((review, index) => (
                <div key={index} className="review-card">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">"{review.text}"</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link to="/testimonials" className="text-primary font-semibold hover:underline">
                View All Reviews →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Your Car Fixed?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Visit us at Gulistan-e-Johar Block 12 or call us now for expert car repair services
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
      </section>
    </main>
  );
};

export default Index;
