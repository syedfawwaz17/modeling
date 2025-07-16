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

const imageSrcToDataUri = async (src: string): Promise<string> => {
    try {
        const response = await fetch(src);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error("Error converting image to data URI:", error);
        return "";
    }
}

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
      const imageDataUris = await Promise.all(allPortfolioImages.map(img => imageSrcToDataUri(img.src)));
      const filteredDataUris = imageDataUris.filter(uri => uri);

      if (filteredDataUris.length === 0) {
        throw new Error("Could not convert any images for analysis.");
      }
      
      const result = await handleHighlightPhotos(filteredDataUris);
      
      if (result.success && result.data?.topPhotoDataUris) {
        setHighlightedPhotos(result.data.topPhotoDataUris);
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
  
  const photosToDisplay = useMemo(() => {
    if (displayMode === 'highlights') {
        // Since highlightedPhotos now contains data URIs, we find the original image object
        // by matching the highlighted data URI with a newly generated one. 
        // This is not perfectly efficient but works for this use case.
        // A better approach for larger galleries might be to map data URIs back to srcs.
        return allPortfolioImages.filter(img => highlightedPhotos.includes(img.src));
    }
    return allPortfolioImages;
  }, [displayMode, highlightedPhotos]);

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
            {allPortfolioImages.map((photo, index) => (
                <PortfolioImage key={`${photo.src}-${index}`} src={photo.src} alt={photo.alt} hint={photo.hint} />
            ))}
        </div>
      </div>
    </section>
  );
}
