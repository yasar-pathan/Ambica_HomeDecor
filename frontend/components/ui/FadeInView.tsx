'use client';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';
import { ReactNode } from 'react';

export default function FadeInView({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}