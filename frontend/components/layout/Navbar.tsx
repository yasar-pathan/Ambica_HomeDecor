'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = cn(
    "fixed top-0 inset-x-0 z-40 transition-all duration-500 ease-luxury",
    isScrolled || pathname !== '/' 
      ? "bg-[#1A1714]/90 backdrop-blur-md text-cream border-b border-white/10 py-3" 
      : "bg-transparent text-cream py-6"
  );

  const links = [
    { name: 'Collection', href: '/collection' },
    { name: 'Categories', href: '/categories' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="z-50 relative flex items-center transition-transform duration-500 origin-left" style={{ transform: isScrolled ? 'scale(0.8)' : 'scale(1)' }}>
          <Image src="/logo.png" alt="Ambica Home Decor Logo" width={90} height={90} className="object-contain" priority />
        </Link>
        
        {/* Desktop */}
        <div className="hidden md:flex gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="nav-link font-mono text-label uppercase">
              {l.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden z-50 relative" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-matte-black text-cream flex flex-col items-center justify-center gap-8 z-40"
            >
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={l.href} 
                    className="font-display text-3xl uppercase tracking-widest"
                    onClick={() => setIsOpen(false)}
                  >
                    {l.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}