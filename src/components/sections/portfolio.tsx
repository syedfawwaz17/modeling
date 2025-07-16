
"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { handleHighlightPhotos } from '@/app/actions';

const allPortfolioImages = [
    { src: '/portfolio/1.jpg', alt: 'Portfolio image 1', hint: 'editorial fashion' },
    { src: '/portfolio/2.jpg', alt: 'Portfolio image 2', hint: 'haute couture' },
    { src: '/portfolio/3.jpg', alt: 'Portfolio image 3', hint: 'runway walk' },
    { src: '/portfolio/4.jpg', alt: 'Portfolio image 4', hint: 'commercial smile' },
    { src: '/portfolio/5.jpg', alt: 'Portfolio image 5', hint: 'street style' },
    { src: '/portfolio/6.jpg', alt: 'Portfolio image 6', hint: 'beauty shot' },
    { src: '/portfolio/7.jpg', alt: 'Portfolio image 7', hint: 'lifestyle product' },
    { src: '/portfolio/8.jpg', alt: 'Portfolio image 8', hint: 'designer show' },
    { src: '/portfolio/9.jpg', alt: 'Portfolio image 9', hint: 'portrait' },
    { src: '/portfolio/10.jpg', alt: 'Portfolio image 10', hint: 'magazine cover' },
];

function PortfolioImage({ src, alt, hint }: { src: string; alt: string; hint: string; }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mb-4 break-inside-avoid">
          <Card className="overflow-hidden group cursor-pointer transform transition-transform duration-300 hover:scale-105 shadow-md hover:shadow-xl bg-card border-none">
            <CardContent className="p-0 relative">
              <Image
                src={src}
                alt={alt}
                width={600}
                height={800}
                className="object-cover w-full h-auto"
                data-ai-hint={hint}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Eye className="text-white h-10 w-10" />
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
        <Image src={src} alt={alt} width={800} height={1200} className="w-full h-auto rounded-lg" data-ai-hint={hint} />
      </DialogContent>
    </Dialog>
  );
}


export default function PortfolioSection() {
  const [displayMode, setDisplayMode] = useState<'all' | 'highlights'>('all');
  const [highlightedPhotos, setHighlightedPhotos] = useState<string[]>([]);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const { toast } = useToast();

  const onHighlight = async () => {
    setIsHighlighting(true);
    setHighlightedPhotos([]);
    try {
      const imageSrcs = allPortfolioImages.map(img => img.src);
      
      const result = await handleHighlightPhotos(imageSrcs);
      
      if (result.success && result.data?.topPhotoSrcs) {
        setHighlightedPhotos(result.data.topPhotoSrcs);
        setDisplayMode('highlights');
        toast({
          title: "Success!",
          description: "AI has selected the top photos.",
        });
      } else {
        throw new Error(result.error || "Could not highlight photos.");
      }
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    }
    setIsHighlighting(false);
  };
  
  const displayedImages = useMemo(() => {
    if (displayMode === 'highlights') {
      return allPortfolioImages.filter(img => highlightedPhotos.includes(img.src));
    }
    return allPortfolioImages;
  }, [displayMode, highlightedPhotos]);


  return (
    <section id="portfolio" className="bg-background">
      <div className="container mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Portfolio</h2>
        <div className="flex justify-center mb-12 gap-4">
          <Button onClick={onHighlight} disabled={isHighlighting} size="lg" variant="default">
            {isHighlighting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-5 w-5" />
            )}
            {isHighlighting ? 'Analyzing...' : 'Let AI Highlight Top Photos'}
          </Button>
          {displayMode === 'highlights' && (
             <Button onClick={() => setDisplayMode('all')} size="lg" variant="outline">
                View All Photos
            </Button>
          )}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {displayedImages.map((photo, index) => (
                <PortfolioImage key={`${photo.src}-${index}`} src={photo.src} alt={photo.alt} hint={photo.hint} />
            ))}
        </div>
      </div>
    </section>
  );
}
