import { Shield, Award, Users, Clock, CheckCircle } from 'lucide-react';
import logo from '@/assets/zb-autocare-logo.jpg';

const stats = [
  { value: '35+', label: 'Years Experience' },
  { value: '5000+', label: 'Cars Serviced' },
  { value: '5.0', label: 'Google Rating' },
  { value: '24/7', label: 'Support' },
];

const values = [
  { 
    icon: Shield, 
    title: 'Honest Diagnosis', 
    desc: 'We provide transparent assessments without hidden charges or unnecessary repairs.' 
  },
  { 
    icon: Award, 
    title: 'Quality Work', 
    desc: 'Every repair meets our high standards with genuine parts and expert craftsmanship.' 
  },
  { 
    icon: Users, 
    title: 'Customer First', 
    desc: 'Your satisfaction is our priority. We treat every car like our own.' 
  },
  { 
    icon: Clock, 
    title: 'Timely Service', 
    desc: 'We respect your time and deliver repairs on schedule.' 
  },
];

const specializations = [
  'Japanese Vehicles (Toyota, Honda, Suzuki)',
  'Local Vehicles (Cultus, Mehran, City)',
  'Korean Vehicles (Hyundai, KIA)',
  'Complete Engine Overhaul',
  'Transmission Repair & Replacement',
  'Brake System Specialists',
  'Suspension & Steering',
  'Computerized Diagnostics',
];

const About = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-secondary via-background to-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-gradient">ZB AutoCare</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              A family-run workshop serving Karachi for over 40 years with dedication, expertise, and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ZB AutoCare is a trusted automotive workshop located in D-101 Block 12 
                  Gulistan-e-Johar Karachi. With 35+ years of mechanical experience, we 
                  are known for accurate diagnosis, honest work, and reliable car solutions.
                </p>
                <p>
                  Our team specializes in complete engine, transmission, brake, and maintenance 
                  services for all Japanese and local vehicles. We have built our reputation 
                  on trust, quality workmanship, and fair pricing.
                </p>
                <p>
                  What started as a small family workshop has grown into one of the most 
                  trusted car repair shops in Karachi, serving thousands of satisfied customers 
                  over the decades.
                </p>
              </div>
              
              <div className="mt-8 p-6 bg-card rounded-xl border border-border">
                <p className="text-accent text-xl mb-2">محفوظ سفر کی ضمانت</p>
                <p className="text-sm text-muted-foreground italic">
                  "A family-run workshop serving Karachi for over 40 years — 
                  where your car is treated like family."
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={logo} 
                alt="ZB AutoCare Workshop" 
                className="rounded-2xl shadow-lg w-full max-w-md mx-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                <p className="text-3xl font-bold">40+</p>
                <p className="text-sm">Years Family Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and have earned us the trust of thousands
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-background rounded-xl p-6 border border-border/50 card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Specializations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expert services for a wide range of vehicles and repair needs
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-4">
              {specializations.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border/50">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
