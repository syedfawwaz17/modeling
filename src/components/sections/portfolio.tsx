"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { handleHighlightPhotos } from '@/app/actions';

const portfolioImages = {
  fashion: [
    { src: 'https://placehold.co/600x800/E0BBE4/000000?text=Fashion+1', alt: 'Fashion photo 1', hint: 'editorial fashion' },
    { src: 'https://placehold.co/600x800/957DAD/FFFFFF?text=Fashion+2', alt: 'Fashion photo 2', hint: 'haute couture' },
  ],
  editorial: [
    { src: 'https://placehold.co/800x600/D291BC/FFFFFF?text=Editorial+1', alt: 'Editorial photo 1', hint: 'magazine shoot' },
  ],
  runway: [
    { src: 'https://placehold.co/600x800/FEC8D8/000000?text=Runway+1', alt: 'Runway photo 1', hint: 'runway walk' },
  ],
  commercial: [
    { src: 'https://placehold.co/800x600/FFDFD3/000000?text=Commercial+1', alt: 'Commercial photo 1', hint: 'commercial smile' },
  ],
};

const allImageUrls = Object.values(portfolioImages).flat().map(img => img.src);

function PortfolioImage({ src, alt, hint }: { src: string; alt: string; hint: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
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
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
        <Image src={src} alt={alt} width={800} height={1200} className="w-full h-auto rounded-lg" data-ai-hint={hint} />
      </DialogContent>
    </Dialog>
  );
}

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState('fashion');
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
        setActiveTab('highlights');
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
  
  const allImagesMap = useMemo(() => new Map(Object.values(portfolioImages).flat().map(img => [img.src, img])), []);

  return (
    <section id="portfolio" className="bg-secondary">
      <div className="container mx-auto text-center">
        <div className="flex justify-center mb-12">
          <Button onClick={onHighlight} disabled={isHighlighting} size="lg">
            {isHighlighting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-5 w-5" />
            )}
            {isHighlighting ? 'Analyzing...' : 'Let AI Highlight Top Photos'}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-background/50">
            <TabsTrigger value="highlights" disabled={highlightedPhotos.length === 0}>Highlights</TabsTrigger>
            <TabsTrigger value="fashion">Fashion</TabsTrigger>
            <TabsTrigger value="editorial">Editorial</TabsTrigger>
            <TabsTrigger value="runway">Runway</TabsTrigger>
            <TabsTrigger value="commercial">Commercial</TabsTrigger>
          </TabsList>
          <TabsContent value="highlights" className="mt-8">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {highlightedPhotos.map((photoSrc) => {
                    const photoDetails = allImagesMap.get(photoSrc);
                    if (!photoDetails) return null;
                    return <PortfolioImage key={`${photoSrc}-${photoDetails.alt}`} src={photoSrc} alt={photoDetails.alt} hint={photoDetails.hint} />
                })}
            </div>
          </TabsContent>
          <TabsContent value="fashion" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioImages.fashion.map((photo) => (
                <PortfolioImage key={`${photo.src}-${photo.alt}`} {...photo} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="editorial" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {portfolioImages.editorial.map((photo) => (
                <PortfolioImage key={`${photo.src}-${photo.alt}`} {...photo} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="runway" className="mt-8">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioImages.runway.map((photo) => (
                <PortfolioImage key={`${photo.src}-${photo.alt}`} {...photo} />
              ))}
            </div>
          </TabsContent>
           <TabsContent value="commercial" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {portfolioImages.commercial.map((photo) => (
                <PortfolioImage key={`${photo.src}-${photo.alt}`} {...photo} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
