import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center text-center p-0">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Priyanka Bishnoi hero image"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
        data-ai-hint="fashion model"
      />
      <div className="absolute inset-0 bg-black/30 z-10" />
      <div className="z-20 text-white p-4">
        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter drop-shadow-lg">
          Priyanka Bishnoi
        </h1>
        <p className="font-headline text-2xl md:text-3xl lg:text-4xl mt-4 italic drop-shadow-md">
          Elegance in Every Frame
        </p>
      </div>
    </section>
  );
}
