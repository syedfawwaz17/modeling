import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

const videos = [
  { src: 'https://placehold.co/400x700.png', alt: 'Reel 1', hint: 'fashion reel' },
  { src: 'https://placehold.co/400x700.png', alt: 'Reel 2', hint: 'behind scenes' },
  { src: 'https://placehold.co/400x700.png', alt: 'Reel 3', hint: 'runway video' },
];

export default function ReelsSection() {
  return (
    <section id="reels" className="bg-background">
      <div className="container mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Reels & Videos</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Catch a glimpse of my work in motion, from runway walks to behind-the-scenes footage.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <a href="#" key={index} className="block group">
              <Card className="overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-0 relative">
                  <Image
                    src={video.src}
                    alt={video.alt}
                    width={400}
                    height={700}
                    className="object-cover w-full h-auto"
                    data-ai-hint={video.hint}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <PlayCircle className="text-white h-16 w-16 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
