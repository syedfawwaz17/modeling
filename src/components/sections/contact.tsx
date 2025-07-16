import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Instagram, MessageCircle, Send } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="bg-secondary">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Get in Touch</h2>
                <p className="text-lg text-muted-foreground">
                    I'm available for collaborations, bookings, and creative projects. Let's create something amazing together. Reach out via the form or my social channels.
                </p>
                <div className="flex items-center gap-4">
                  <a href="mailto:pihubishnoi134@gmail.com" aria-label="Email" className="group">
                    <div className="p-3 bg-background rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                  </a>
                  <a href="https://instagram.com/Priyankaabishnoii" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group">
                     <div className="p-3 bg-background rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent">
                      <Instagram className="h-6 w-6 text-primary" />
                    </div>
                  </a>
                  <a href="https://wa.me/7851000469" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="group">
                     <div className="p-3 bg-background rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                  </a>
                </div>
            </div>
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Contact Form</CardTitle>
                    <CardDescription>Fill out the form below to send me a message directly.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                             <Input id="name" placeholder="Your Name" />
                        </div>
                         <div className="space-y-2">
                             <Input id="email" type="email" placeholder="Your Email" />
                        </div>
                         <div className="space-y-2">
                             <Textarea id="message" placeholder="Your Message" rows={5} />
                        </div>
                        <Button type="submit" className="w-full">
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
