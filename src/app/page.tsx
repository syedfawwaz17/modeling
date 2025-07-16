import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import PortfolioSection from '@/components/sections/portfolio';
import LookbookSection from '@/components/sections/lookbook';
import ReelsSection from '@/components/sections/reels';
import ContactSection from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <LookbookSection />
        <ReelsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
