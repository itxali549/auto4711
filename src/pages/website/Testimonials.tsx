import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/website/Layout';

const testimonials = [
  {
    name: 'Ahmed Khan',
    initial: 'A',
    car: 'Toyota Corolla 2018',
    rating: 5,
    text: 'Brakes weaken faster in Karachi due to stop-and-go traffic. ZB AutoCare did an amazing job fixing my car! They diagnosed the issue quickly and the repairs were done the same day. Highly professional service.',
    date: 'January 2025',
  },
  {
    name: 'Imran Sheikh',
    initial: 'I',
    car: 'Hyundai Elantra 2020',
    rating: 5,
    text: 'My Hyundai Elantra had softer brakes — fixed professionally. Highly recommend ZB AutoCare. The prices are fair and they explain everything before doing any work. Will definitely come back.',
    date: 'December 2024',
  },
  {
    name: 'Farooq Malik',
    initial: 'F',
    car: 'Toyota Tundra',
    rating: 5,
    text: 'Toyota Tundra brake repair — excellent service. Best mechanic in Gulistan-e-Johar! They have been servicing my cars for over 10 years. Trustworthy and reliable.',
    date: 'December 2024',
  },
  {
    name: 'Muhammad Ali',
    initial: 'M',
    car: 'Honda Civic 2019',
    rating: 5,
    text: 'Engine overheating issue was diagnosed and fixed perfectly. The cooling system was cleaned and repaired. Car runs smoothly now. Thank you ZB AutoCare!',
    date: 'November 2024',
  },
  {
    name: 'Bilal Ahmed',
    initial: 'B',
    car: 'Suzuki Swift 2017',
    rating: 5,
    text: 'Transmission problem solved in just one day. Very reasonable prices compared to other workshops. The staff is friendly and keeps you updated on the progress.',
    date: 'November 2024',
  },
  {
    name: 'Hassan Raza',
    initial: 'H',
    car: 'Toyota Yaris 2021',
    rating: 5,
    text: 'AC repair done professionally. The workshop is clean and organized. They use quality parts and provide warranty on their work. Recommended!',
    date: 'October 2024',
  },
  {
    name: 'Usman Ghani',
    initial: 'U',
    car: 'Honda City 2016',
    rating: 5,
    text: 'Complete engine tune-up improved my fuel efficiency significantly. Honest diagnosis without upselling unnecessary services. This is rare to find in Karachi.',
    date: 'October 2024',
  },
  {
    name: 'Rizwan Qureshi',
    initial: 'R',
    car: 'Kia Sportage 2020',
    rating: 5,
    text: 'Suspension work was done with precision. The car feels like new now. Fair pricing and excellent customer service. Zulfiqar Bhai really knows his work.',
    date: 'September 2024',
  },
];

const Testimonials = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Customer Reviews</h1>
            <p className="text-lg text-gray-600 mb-6">
              See what our customers say about their experience with ZB AutoCare
            </p>
            <div className="inline-flex items-center gap-4 bg-white rounded-xl px-6 py-4 shadow-lg">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-left">
                <div className="font-bold text-2xl text-gray-900">5.0</div>
                <div className="text-sm text-gray-500">34+ Google Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {testimonial.initial}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.car}</p>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Quote className="h-8 w-8 text-orange-100 mb-2" />
                  <p className="text-gray-600 text-sm leading-relaxed">{testimonial.text}</p>
                  <p className="text-xs text-gray-400 mt-4">{testimonial.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews CTA */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Happy with our service?</h2>
          <p className="text-gray-600 mb-6">Leave us a review on Google Maps</p>
          <a 
            href="https://share.google/niVDDcV4ADLhQtaeu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-6 py-3 font-medium text-gray-700 hover:shadow-md transition-shadow"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Review on Google
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
