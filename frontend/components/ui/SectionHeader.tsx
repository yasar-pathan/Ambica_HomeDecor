import React from 'react';

export default function SectionHeader({ label, heading, subtitle }: { label: string; heading: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-3">
        <div className="w-6 h-[1px] bg-sand"></div>
        <span className="font-mono text-label text-warm-gray tracking-widest uppercase">{label}</span>
        <div className="w-6 h-[1px] bg-sand"></div>
      </div>
      <h2 className="font-display text-headline text-charcoal mb-4">{heading}</h2>
      {subtitle && <p className="font-body text-subtitle text-taupe max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}