import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream pt-48">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-6 text-center mb-20">
        <h1 className="font-display text-display text-charcoal mb-6">A Legacy of <br/><span className="text-gold-muted italic">Craftsmanship</span></h1>
        <p className="font-body text-subtitle text-taupe leading-relaxed">
          Founded on the principle that the spaces we inhabit shape our daily lives, Ambica Home Decor brings heritage craftsmanship and museum-quality artistry to residential interiors.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mb-section">
        <div className="aspect-[21/9] relative bg-charcoal mb-16">
          <Image src="https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg" alt="Atelier" fill className="object-cover opacity-80" />
        </div>
        
        <div className="max-w-2xl mx-auto font-body text-taupe text-lg leading-loose space-y-6">
          <p>
            Every piece in our collection begins its journey not in a factory, but in the minds of our visionary designers and the hands of master artisans. We source the finest materials globally—from rich, sustainable hardwoods to ethically crafted brass and marble—ensuring that our profound heritage matches our timeless aesthetics.
          </p>
          <p>
            Our aesthetic, which we term "Global Luxury Restraint," relies on silence, space, materiality, and cultural resonance. We believe that true luxury does not shout; it merely exists, quietly demanding attention through impeccable proportion and flawless execution.
          </p>
          <div className="pl-6 border-l-2 border-gold-muted my-12 py-2">
            <p className="font-display text-2xl italic text-charcoal leading-tight">
              "The whitespace is the luxury. Allow the eye to rest, and the mind to appreciate the profound cultural material."
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}