import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/ui/SectionHeader';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream pt-48">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 mb-section grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <SectionHeader 
            label="Inquiries" 
            heading="Let's Create Something Beautiful" 
          />
          <form className="space-y-6 mt-12">
            <div>
              <label className="block font-mono text-label text-charcoal mb-2 uppercase">Full Name</label>
              <input type="text" className="w-full bg-parchment border-none px-4 py-3 font-body focus:ring-2 focus:ring-gold-muted outline-none" placeholder="Jane Doe" required />
            </div>
            <div>
              <label className="block font-mono text-label text-charcoal mb-2 uppercase">Email Address</label>
              <input type="email" className="w-full bg-parchment border-none px-4 py-3 font-body focus:ring-2 focus:ring-gold-muted outline-none" placeholder="jane@example.com" required />
            </div>
            <div>
              <label className="block font-mono text-label text-charcoal mb-2 uppercase">Message</label>
              <textarea rows={5} className="w-full bg-parchment border-none px-4 py-3 font-body focus:ring-2 focus:ring-gold-muted outline-none resize-none" placeholder="How can we help you?" required></textarea>
            </div>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        </div>
        
        <div className="bg-charcoal text-cream p-12 lg:p-16 flex flex-col justify-center">
          <h3 className="font-display text-3xl mb-8">Direct Contact</h3>
          <div className="space-y-8 font-body text-sand">
            <div>
              <h4 className="font-mono text-label uppercase text-warm-gray mb-2">Visit Our Studio</h4>
              <p>123 Luxury Avenue<br/>Design District, NY 10001<br/>By Appointment Only</p>
            </div>
            <div>
              <h4 className="font-mono text-label uppercase text-warm-gray mb-2">Email</h4>
              <p>hello@luxedecor.com</p>
            </div>
            <div>
              <h4 className="font-mono text-label uppercase text-warm-gray mb-2">WhatsApp / Phone</h4>
              <p>+91 9876543210</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}