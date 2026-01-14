import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/website/Layout';

// Placeholder gallery images - in a real app, these would come from your database/storage
const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600', alt: 'Engine repair work', category: 'Engine' },
  { id: 2, src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600', alt: 'Transmission service', category: 'Transmission' },
  { id: 3, src: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600', alt: 'Brake repair', category: 'Brakes' },
  { id: 4, src: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=600', alt: 'Car maintenance', category: 'Maintenance' },
  { id: 5, src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600', alt: 'Toyota service', category: 'Toyota' },
  { id: 6, src: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600', alt: 'Honda repair', category: 'Honda' },
  { id: 7, src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600', alt: 'Workshop view', category: 'Workshop' },
  { id: 8, src: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600', alt: 'Completed work', category: 'Completed' },
];

const categories = ['All', 'Engine', 'Transmission', 'Brakes', 'Maintenance', 'Toyota', 'Honda', 'Workshop', 'Completed'];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const currentIndex = lightboxImage ? filteredImages.findIndex(img => img.id === lightboxImage.id) : -1;

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightboxImage) return;
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
      : (currentIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[newIndex]);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Gallery</h1>
            <p className="text-lg text-gray-600">
              Browse through our work gallery to see the quality of our repairs and services
            </p>
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <Card 
                key={image.id} 
                className="overflow-hidden cursor-pointer group border-0 shadow-md"
                onClick={() => setLightboxImage(image)}
              >
                <CardContent className="p-0 relative">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-white text-sm font-medium">{image.category}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>
          <button 
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <button 
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
          <img 
            src={lightboxImage.src} 
            alt={lightboxImage.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
          <div className="absolute bottom-4 text-white text-center">
            <p className="font-medium">{lightboxImage.alt}</p>
            <p className="text-sm text-gray-300">{currentIndex + 1} / {filteredImages.length}</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
