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
    { src: 'https://placehold.co/600x800.png', alt: 'Fashion photo 1', hint: 'editorial fashion' },
    { src: 'https://placehold.co/600x600.png', alt: 'Fashion photo 2', hint: 'haute couture' },
    { src: 'https://placehold.co/600x800.png', alt: 'Runway photo 1', hint: 'runway walk' },
    { src: 'https://placehold.co/600x400.png', alt: 'Commercial photo 1', hint: 'commercial smile' },
    { src: 'https://placehold.co/600x800.png', alt: 'Fashion photo 3', hint: 'street style' },
    { src: 'https://placehold.co/600x800.png', alt: 'Editorial photo 2', hint: 'beauty shot' },
    { src: 'https://placehold.co/600x500.png', alt: 'Commercial photo 2', hint: 'lifestyle product' },
    { src: 'https://placehold.co/600x800.png', alt: 'Runway photo 2', hint: 'designer show' },
    { src: 'https://placehold.co/600x800.png', alt: 'Fashion photo 4', hint: 'portrait' },
    { src: 'https://placehold.co/600x700.png', alt: 'Editorial photo 3', hint: 'magazine cover' },
    { src: 'https://placehold.co/600x800.png', alt: 'Commercial photo 3', hint: 'product ad' },
    { src: 'https://placehold.co/600x800.png', alt: 'Runway photo 3', hint: 'fashion week' },
];

const allImageUrls = allPortfolioImages.map(img => img.src);

function PortfolioImage({ src, alt, hint }: { src: string; alt: string; hint: string; }) {
  // Use a unique key combining src and alt, and index as a fallback
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
      const result = await handleHighlightPhotos(allImageUrls);
      if (result.success && result.data?.topPhotoUrls) {
        setHighlightedPhotos(result.data.topPhotoUrls);
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
  
  const allImagesMap = useMemo(() => new Map(allPortfolioImages.map((img, index) => [`${img.src}-${index}`, img])), []);

  const photosToDisplay = useMemo(() => {
    if (displayMode === 'highlights') {
      // Find the full image object from the map using the highlighted URL
      return highlightedPhotos
        .map(url => {
            // Find the first entry that matches the URL
            for (const [key, value] of allImagesMap.entries()) {
                if (value.src === url) {
                    return { ...value, key };
                }
            }
            return null;
        })
        .filter(Boolean) as ({src: string, alt: string, hint: string, key: string})[];
    }
    // Add the key to all images
    return allPortfolioImages.map((img, index) => ({...img, key: `${img.src}-${index}`}));
  }, [displayMode, highlightedPhotos, allImagesMap]);


  return (
    <section id="portfolio" className="bg-background">
      <div className="container mx-auto text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold mb-4">Portfolio</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          A collection of my work across fashion, editorial, and commercial projects.
        </p>
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
            {photosToDisplay.map((photo) => (
                <PortfolioImage key={photo.key} src={photo.src} alt={photo.alt} hint={photo.hint} />
            ))}
        </div>
      </div>
    </section>
  );
}
