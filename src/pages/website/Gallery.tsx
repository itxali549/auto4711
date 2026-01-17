import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Wrench, Car, Settings } from 'lucide-react';

// Using placeholder images since gallery images weren't provided
const galleryImages = [
  { icon: Wrench, title: 'Suzuki Cultus Maintenance', category: 'Maintenance' },
  { icon: Settings, title: 'Engine Repair Work', category: 'Engine' },
  { icon: Car, title: 'Workshop Interior', category: 'Workshop' },
  { icon: Car, title: 'Multiple Car Service', category: 'Workshop' },
  { icon: Car, title: 'Workshop Entrance', category: 'Workshop' },
  { icon: Settings, title: 'Honda Civic Repair', category: 'Engine' },
  { icon: Settings, title: 'Toyota Corolla Service', category: 'Engine' },
  { icon: Wrench, title: 'Head Gasket Guide', category: 'Educational' },
];

const categories = ['All', 'Engine', 'Maintenance', 'Workshop', 'Educational'];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalImage, setModalImage] = useState<number | null>(null);

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (index: number) => {
    setModalImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateModal = (direction: 'prev' | 'next') => {
    if (modalImage === null) return;
    const newIndex = direction === 'prev' 
      ? (modalImage - 1 + filteredImages.length) % filteredImages.length
      : (modalImage + 1) % filteredImages.length;
    setModalImage(newIndex);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-secondary via-background to-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              See our work in action — real repairs, real results
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-card border-y border-border">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                onClick={() => openModal(index)}
                className="group relative overflow-hidden rounded-xl cursor-pointer card-hover bg-card border border-border"
              >
                <div className="aspect-[4/3] overflow-hidden flex items-center justify-center bg-muted">
                  <image.icon className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="p-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-2">
                    {image.category}
                  </span>
                  <h3 className="font-semibold">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Want to see more of our work? Follow us on Instagram!
            </p>
            <a
              href="https://instagram.com/zbautocare"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Follow @zbautocare
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={closeModal}>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateModal('prev'); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateModal('next'); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          <div 
            className="max-w-2xl w-full bg-card rounded-xl p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              {(() => {
                const IconComponent = filteredImages[modalImage].icon;
                return <IconComponent className="w-12 h-12 text-primary" />;
              })()}
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {filteredImages[modalImage].title}
            </h3>
            <span className="text-muted-foreground">
              {modalImage + 1} / {filteredImages.length}
            </span>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
