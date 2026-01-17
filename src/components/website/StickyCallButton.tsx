import { Phone } from 'lucide-react';

const StickyCallButton = () => {
  return (
    <a
      href="tel:+923032931424"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform animate-pulse-glow md:hidden"
      aria-label="Call ZB AutoCare"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
};

export default StickyCallButton;
