import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/layout/Layout';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '+92 303 7777711',
    href: 'tel:+923037777711',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'hzk.blackberry@gmail.com',
    href: 'mailto:hzk.blackberry@gmail.com',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'DHA Phase 5 Exit, Jammu Stop, Lahore, Pakistan 54000',
    href: 'https://maps.google.com/?q=DHA+Phase+5+Lahore+Pakistan',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    value: 'Mon - Sat: 9:00 AM - 7:00 PM',
    href: null,
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: 'Message sent!',
        description: 'We\'ll get back to you as soon as possible.',
      });

      setFormData({ name: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try calling us instead.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-primary text-sm font-semibold tracking-wide uppercase mb-4 block">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight mb-6">
              Let's Get Your Car
              <span className="text-gradient block">Looking Perfect</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Ready to give your vehicle the care it deserves? Reach out to us today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-heading font-bold mb-8">Get in Touch</h2>
              
              <div className="grid gap-4 mb-8">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="card-gradient border border-border rounded-xl p-5 hover:border-primary/50 transition-colors"
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-4"
                      >
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <info.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-muted-foreground mb-1">{info.title}</h3>
                          <p className="text-foreground">{info.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <info.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-muted-foreground mb-1">{info.title}</h3>
                          <p className="text-foreground">{info.value}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mb-8">
                <h3 className="font-heading font-semibold mb-4">Follow Us</h3>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.facebook.com/profile.php?id=100057569623243"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/auto711_services/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5!2d74.4!3d31.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDI0JzAwLjAiTiA3NMKwMjQnMDAuMCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="AUTO 711 Location"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="card-gradient border border-border rounded-xl p-8">
                <h2 className="text-2xl font-heading font-bold mb-2">Send us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your vehicle and what service you need"
                      rows={5}
                      required
                      className="bg-background border-border resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;