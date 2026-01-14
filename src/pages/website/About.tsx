import { Users, Award, Shield, Wrench, Clock, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/website/Layout';
import zbLogo from '@/assets/zb-logo.png';

const milestones = [
  { year: '1985', title: 'Founded', description: 'Started as a small workshop in Karachi' },
  { year: '1995', title: 'Expansion', description: 'Moved to larger facility in Gulistan-e-Johar' },
  { year: '2010', title: 'Modernization', description: 'Updated with modern diagnostic equipment' },
  { year: 'Today', title: '40+ Years Strong', description: 'Serving second generation of customers' },
];

const team = [
  { name: 'Zulfiqar Bhai', role: 'Founder & Senior Mechanic', experience: '40+ years experience' },
  { name: 'Farhan', role: 'Lead Technician', experience: '15+ years experience' },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <img src={zbLogo} alt="ZB AutoCare" className="h-20 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About ZB AutoCare</h1>
            <p className="text-lg text-gray-600">
              A family-run auto repair workshop serving Karachi for over 40 years with dedication, expertise, and honest service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  ZB AutoCare was founded in 1985 by Zulfiqar Bhai with a simple mission: provide honest, reliable car repair services to the people of Karachi.
                </p>
                <p>
                  What started as a small workshop has grown into one of the most trusted names in auto repair in Gulistan-e-Johar. Our reputation is built on transparency, fair pricing, and exceptional workmanship.
                </p>
                <p>
                  Today, we serve the second generation of our loyal customers, many of whom bring their children's cars to us after years of trusting us with their own vehicles.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-orange-50 border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">40+</div>
                  <p className="text-gray-600 text-sm">Years of Experience</p>
                </CardContent>
              </Card>
              <Card className="bg-orange-50 border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">5000+</div>
                  <p className="text-gray-600 text-sm">Cars Serviced</p>
                </CardContent>
              </Card>
              <Card className="bg-orange-50 border-0">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">34+</div>
                  <p className="text-gray-600 text-sm">Google Reviews</p>
                </CardContent>
              </Card>
              <Card className="bg-orange-50 border-0">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">5.0 Rating</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-orange-200" />
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'} pl-12 md:pl-0`}>
                    <Card className="bg-white border-0 shadow-md">
                      <CardContent className="p-4">
                        <span className="text-orange-500 font-bold text-lg">{milestone.year}</span>
                        <h3 className="font-semibold text-gray-900 mt-1">{milestone.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Honesty</h3>
              <p className="text-gray-600 text-sm">We tell you exactly what your car needs, nothing more</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600 text-sm">We use quality parts and expert workmanship</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Family</h3>
              <p className="text-gray-600 text-sm">We treat every customer like family</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Reliability</h3>
              <p className="text-gray-600 text-sm">We deliver on our promises, every time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="bg-white border-0 shadow-md overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wrench className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="font-semibold text-xl text-gray-900">{member.name}</h3>
                  <p className="text-orange-500 text-sm mt-1">{member.role}</p>
                  <p className="text-gray-500 text-sm mt-2">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
