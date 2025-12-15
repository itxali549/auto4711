const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop',
    alt: 'Luxury car exterior',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop',
    alt: 'Classic car restoration',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&auto=format&fit=crop',
    alt: 'Sports car detailing',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=600&auto=format&fit=crop',
    alt: 'Car paint booth',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop',
    alt: 'Engine bay detail',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&auto=format&fit=crop',
    alt: 'Premium vehicle',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop',
    alt: 'Showroom quality finish',
    span: 'md:col-span-2 md:row-span-2',
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