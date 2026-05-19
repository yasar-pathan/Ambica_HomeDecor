import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
        <div className="lg:pr-8">
          <div className="mb-6 flex justify-center md:justify-start">
            <Image src="/logo.png" alt="Ambica Home Decor Logo" width={140} height={140} className="object-contain" />
          </div>
          <p className="font-body text-sm text-sand/80 max-w-sm mx-auto md:mx-0">
            Transforming homes into heavens since 1993. Premium wallpapers, curtains, and bespoke home decor curated for modern luxury.
          </p>
        </div>
        
        <div>
          <h4 className="font-mono text-label uppercase mb-6 text-warm-gray tracking-widest">Quick Links</h4>
          <div className="flex flex-col gap-4 font-mono text-xs uppercase tracking-wider">
            <Link href="/collection" className="hover:text-gold-muted transition-colors">Complete Collection</Link>
            <Link href="/gallery" className="hover:text-gold-muted transition-colors">Interior Gallery</Link>
            <Link href="/about" className="hover:text-gold-muted transition-colors">Our Heritage</Link>
            <Link href="/contact" className="hover:text-gold-muted transition-colors">Contact Us</Link>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-label uppercase mb-6 text-warm-gray tracking-widest">Collections</h4>
          <div className="flex flex-col gap-4 font-mono text-xs uppercase tracking-wider">
            <Link href="/collection?category=seamless-wallpaper" className="hover:text-gold-muted transition-colors">Seamless Wallpaper</Link>
            <Link href="/collection?category=roman-blinds" className="hover:text-gold-muted transition-colors">Roman Blinds</Link>
            <Link href="/collection?category=curtain" className="hover:text-gold-muted transition-colors">Luxury Curtains</Link>
            <Link href="/collection?category=sofa-fabric" className="hover:text-gold-muted transition-colors">Sofa Fabrics</Link>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-label uppercase mb-6 text-warm-gray tracking-widest">Connect & Visit</h4>
          <div className="font-body text-sm flex flex-col gap-4 text-sand/90">
            <address className="not-italic">
              Ambica Rexine<br />
              Bardoli, Gujarat<br />
              India
            </address>
            <div className="flex flex-col gap-1">
              <a href="mailto:hello@ambicahomedecor.com" className="hover:text-gold-muted transition-colors">hello@ambicahomedecor.com</a>
              <a href="tel:+919664770335" className="hover:text-gold-muted transition-colors">+91 9664770335</a>
            </div>
            <div className="flex gap-4 mt-2 justify-center md:justify-start">
              <a href="#" className="text-warm-gray hover:text-gold-muted transition-colors font-mono text-xs uppercase">Instagram</a>
              <a href="#" className="text-warm-gray hover:text-gold-muted transition-colors font-mono text-xs uppercase">Facebook</a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-center font-mono text-[10px] text-warm-gray uppercase tracking-widest gap-4">
        <span>© {new Date().getFullYear()} Ambica Home Decor. All rights reserved.</span>
        <span>DEBUG API URL: {process.env.NEXT_PUBLIC_API_URL || 'NOT SET (DEFAULTS TO LOCALHOST)'}</span>
        <Link href="/admin/login" className="hover:text-gold-muted transition-colors">Staff Login</Link>
      </div>
    </footer>
  );
}