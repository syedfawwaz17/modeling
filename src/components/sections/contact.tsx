"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Instagram, MessageCircle, Send } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Contact Form Submission from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:pihubishnoi134@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <h2 className="font-headline text-4xl md:text-5xl font-bold">Get in Touch</h2>
                <p className="text-lg text-muted-foreground">
                    I'm available for collaborations, bookings, and creative projects. Let's create something amazing together. Reach out via the form or my social channels.
                </p>
                <div className="flex items-center gap-4">
                  <a href="mailto:pihubishnoi134@gmail.com" aria-label="Email" className="group">
                    <div className="p-3 bg-secondary rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                  </a>
                  <a href="https://instagram.com/Priyankaabishnoii" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group">
                     <div className="p-3 bg-secondary rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <Instagram className="h-6 w-6 text-primary" />
                    </div>
                  </a>
                  <a href="https://wa.me/7851000469" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="group">
                     <div className="p-3 bg-secondary rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                      <MessageCircle className="h-6 w-6 text-primary" />
                    </div>
                  </a>
                </div>
            </div>
             <Card className="shadow-lg bg-card border-border">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Contact Form</CardTitle>
                    <CardDescription>Fill out the form below to send me a message directly.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                             <Input id="name" name="name" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                             <Input id="email" name="email" type="email" placeholder="Your Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                         <div className="space-y-2">
                             <Textarea id="message" name="message" placeholder="Your Message" rows={5} required value={message} onChange={(e) => setMessage(e.target.value)} />
                        </div>
                        <Button onClick={handleSendEmail} className="w-full">
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}