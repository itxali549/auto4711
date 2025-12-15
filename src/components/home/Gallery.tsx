import gallery1 from '@/assets/gallery-1.png';
import gallery2 from '@/assets/gallery-2.png';
import gallery3 from '@/assets/gallery-3.png';
import gallery4 from '@/assets/gallery-4.png';
import gallery5 from '@/assets/gallery-5.png';
import gallery6 from '@/assets/gallery-6.png';
import gallery7 from '@/assets/gallery-7.png';
import gallery8 from '@/assets/gallery-8.png';

const galleryImages = [
  {
    src: gallery1,
    alt: 'Classic convertible restoration',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: gallery2,
    alt: 'Land Cruiser restoration',
    span: '',
  },
  {
    src: gallery3,
    alt: 'Vehicle rear detail',
    span: '',
  },
  {
    src: gallery4,
    alt: 'Engine bay work',
    span: '',
  },
  {
    src: gallery5,
    alt: 'Custom Jeep build',
    span: '',
  },
  {
    src: gallery6,
    alt: 'BMW interior restoration',
    span: '',
  },
  {
    src: gallery7,
    alt: 'BMW sunset shot',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: gallery8,
    alt: 'Toyota front detail',
    span: '',
  },
];

const Gallery = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary text-sm font-semibold tracking-wide uppercase mb-4 block">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold tracking-tight mb-6">
            Gallery
          </h2>
          <p className="text-muted-foreground text-lg">
            See the quality and attention to detail we bring to every project.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-xl ${image.span}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover aspect-square transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium text-foreground">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
