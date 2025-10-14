import Header from '@/components/Header';
import QuoteForm from '@/components/QuoteForm';
import Footer from '@/components/Footer';

export default function Quote() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
