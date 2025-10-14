import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EuropeMap from '@/components/EuropeMap';
import NetworkSection from '@/components/NetworkSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <EuropeMap />
        <NetworkSection />
      </main>
      <Footer />
    </div>
  );
}
