
"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

const videos = [
  { thumbnailUrl: '/reels/thumb1.jpg', videoUrl: '/reels/reel1.mp4', alt: 'Reel 1', hint: 'fashion reel' },
  { thumbnailUrl: '/reels/thumb2.jpg', videoUrl: '/reels/reel2.mp4', alt: 'Reel 2', hint: 'behind scenes' },
  { thumbnailUrl: '/reels/thumb3.jpg', videoUrl: '/reels/reel3.mp4', alt: 'Reel 3', hint: 'runway video' },
];

const ReelCard = ({ thumbnailUrl, videoUrl, alt, hint }: (typeof videos)[0]) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleThumbnailClick = () => {
    setIsPlaying(true);
  };

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  return (
    <Card className="overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-card border-none group">
      <CardContent className="p-0 relative aspect-[9/16]">
        {isPlaying ? (
           <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            onClick={handleVideoClick}
            onEnded={() => setIsPlaying(false)}
            controls
            autoPlay
          />
        ) : (
          <>
            <Image
              src={thumbnailUrl}
              alt={alt}
              fill
              className="object-cover w-full h-full"
              data-ai-hint={hint}
            />
            <div 
              className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
              onClick={handleThumbnailClick}
            >
              <PlayCircle className="text-white h-16 w-16 transition-transform duration-300 group-hover:scale-110" />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};


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
            <ReelCard key={index} {...video} />
          ))}
        </div>
      </div>
    </section>
  );
}
