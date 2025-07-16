import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutSection() {
  return (
    <section id="about" className="bg-secondary/50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="w-full h-full flex justify-center">
             <Card className="overflow-hidden shadow-lg w-full max-w-md bg-card border-none">
                <CardContent className="p-0">
                   <Image
                      src="/portfolio/7.jpg"
                      alt="About Priyanka Bishnoi"
                      width={600}
                      height={800}
                      className="object-cover w-full h-auto"
                      data-ai-hint="beauty portrait"
                    />
                </CardContent>
             </Card>
          </div>
          <div className="space-y-6">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">About Me</h2>
            <p className="text-lg text-muted-foreground">
              A passionate and dedicated fashion and commercial model with a flair for bringing creative visions to life. With years of experience on the runway and in front of the camera, I specialize in creating compelling imagery that resonates with audiences and elevates brand aesthetics.
            </p>
            <div className="space-y-4">
              <h3 className="font-headline text-2xl font-semibold">Measurements</h3>
              <ul className="list-none space-y-2 text-muted-foreground">
                <li><span className="font-semibold text-foreground">Height:</span> 5' 5"</li>
                <li><span className="font-semibold text-foreground">Weight:</span> 52 kg</li>
                <li><span className="font-semibold text-foreground">Bust:</span> 32"</li>
                <li><span className="font-semibold text-foreground">Waist:</span> 28"</li>
                <li><span className="font-semibold text-foreground">Hips:</span> 34"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
