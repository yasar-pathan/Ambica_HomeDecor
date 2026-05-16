export default function AdminSettings() {
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl text-charcoal mb-8">Site Settings</h2>
      <div className="bg-white p-8 border border-sand/30 font-body text-sm">
        <p className="text-taupe italic mb-4">Settings CMS is currently in read-only preview mode to protect critical deployment values.</p>
        <div className="space-y-4">
          <div className="p-4 bg-parchment"><span className="font-mono text-xs uppercase text-warm-gray block mb-1">Brand Name</span>Ambica Home Decor</div>
          <div className="p-4 bg-parchment"><span className="font-mono text-xs uppercase text-warm-gray block mb-1">WhatsApp</span>+91 9876543210</div>
          <div className="p-4 bg-parchment"><span className="font-mono text-xs uppercase text-warm-gray block mb-1">Contact Email</span>hello@luxedecor.com</div>
        </div>
      </div>
    </div>
  );
}