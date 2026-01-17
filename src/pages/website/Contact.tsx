import { useState } from 'react';
import { Phone, MapPin, Clock, Instagram, Globe, Send, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    problem: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "We'll contact you shortly. Thank you for choosing ZB AutoCare!",
    });
    
    setFormData({ name: '', phone: '', carModel: '', problem: '' });
    setSelectedFile(null);
    setIsSubmitting(false);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-secondary via-background to-secondary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Contact <span className="text-gradient">Us</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Get in touch with us for expert car repair services
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="03XX XXXXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="carModel" className="block text-sm font-medium mb-2">
                    Car Model *
                  </label>
                  <input
                    type="text"
                    id="carModel"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="e.g., Toyota Corolla 2020"
                  />
                </div>

                <div>
                  <label htmlFor="problem" className="block text-sm font-medium mb-2">
                    Problem Description *
                  </label>
                  <textarea
                    id="problem"
                    name="problem"
                    value={formData.problem}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Describe the issue with your car..."
                  />
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium mb-2">
                    Upload Image (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-dashed border-border bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                    >
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {selectedFile ? selectedFile.name : 'Click to upload image'}
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-lg h-64 md:h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.8!2d67.129!3d24.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDU1JzA0LjgiTiA2N8KwMDcnNDQuNCJF!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ZB AutoCare Location"
                />
              </div>

              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="tel:+923032931424"
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Farhan Ali</p>
                    <p className="text-muted-foreground">+92 303 2931424</p>
                  </div>
                </a>

                <a
                  href="tel:+923331385571"
                  className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Zulfiqar Ali</p>
                    <p className="text-muted-foreground">+92 333 1385571</p>
                  </div>
                </a>
              </div>

              {/* Info Cards */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-muted-foreground">
                      D-101 Block 12 Gulistan-e-Johar, Karachi 75290
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Working Hours</p>
                    <p className="text-muted-foreground">
                      Monday – Sunday | 10 AM – 7 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Instagram</p>
                    <a
                      href="https://instagram.com/zbautocare"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      @zbautocare
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Website</p>
                    <a
                      href="https://www.zbautocare.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      www.zbautocare.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
