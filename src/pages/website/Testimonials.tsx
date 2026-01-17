import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Ahmed Khan',
    initials: 'AK',
    rating: 5,
    text: 'Brakes weaken faster in Karachi due to stop-and-go traffic. ZB AutoCare did amazing work fixing my car. The brakes feel brand new and response is instant!',
    vehicle: 'Toyota Corolla',
  },
  {
    name: 'Imran Sheikh',
    initials: 'IS',
    rating: 5,
    text: 'My Hyundai Elantra brakes were getting softer — fixed professionally at ZB AutoCare. Highly recommend them for anyone looking for honest mechanics.',
    vehicle: 'Hyundai Elantra',
  },
  {
    name: 'Farooq Malik',
    initials: 'FM',
    rating: 5,
    text: 'Toyota Tundra brake repair — excellent service. Best mechanic in Gulistan-e-Johar! They diagnosed the issue quickly and fixed it at a fair price.',
    vehicle: 'Toyota Tundra',
  },
  {
    name: 'Hassan Raza',
    initials: 'HR',
    rating: 5,
    text: 'Engine was overheating badly. They diagnosed head gasket issue immediately. Honest work and fair pricing. My car runs perfectly now!',
    vehicle: 'Honda City',
  },
  {
    name: 'Bilal Ahmed',
    initials: 'BA',
    rating: 5,
    text: 'My Cultus runs like new after their full tune-up. Very satisfied with the service. They explained everything they did clearly.',
    vehicle: 'Suzuki Cultus',
  },
  {
    name: 'Kamran Ali',
    initials: 'KA',
    rating: 5,
    text: 'Had transmission issues that other mechanics couldn\'t figure out. ZB AutoCare fixed it in one visit. Truly expert mechanics!',
    vehicle: 'Honda Civic',
  },
  {
    name: 'Naveed Hussain',
    initials: 'NH',
    rating: 5,
    text: 'Regular maintenance done here for years. Always honest, always professional. They never recommend unnecessary work.',
    vehicle: 'Toyota Vitz',
  },
  {
    name: 'Saad Qureshi',
    initials: 'SQ',
    rating: 5,
    text: 'Complete engine overhaul done here. The work quality is exceptional. My old car feels like new. Highly recommended!',
    vehicle: 'Suzuki Swift',
  },
  {
    name: 'Usman Tariq',
    initials: 'UT',
    rating: 5,
    text: 'Best workshop in Block 12. Fair prices, honest diagnosis, quality work. What more could you ask for? Been coming here for 5 years.',
    vehicle: 'Daihatsu Mira',
  },
  {
    name: 'Zain Abbas',
    initials: 'ZA',
    rating: 5,
    text: 'Suspension work done perfectly. Car handles like a dream now. The team at ZB AutoCare really knows their stuff!',
    vehicle: 'Honda Vezel',
  },
];

const Testimonials = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-secondary via-background to-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Customer <span className="text-gradient">Testimonials</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              What our customers say about us — real reviews from real people
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                ))}
              </div>
              <span className="font-bold text-xl">5.0</span>
              <span className="text-muted-foreground">(34+ Google reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <article
                key={index}
                className="review-card relative"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.vehicle}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-muted-foreground">"{testimonial.text}"</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Satisfied Customers
            </h2>
            <p className="text-muted-foreground mb-8">
              Experience the ZB AutoCare difference. Honest diagnosis, quality work, fair prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+923032931424" className="btn-primary">
                Call: +92 303 2931424
              </a>
              <a
                href="https://g.page/r/CZBAutocare/review"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Leave a Review
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Testimonials;
