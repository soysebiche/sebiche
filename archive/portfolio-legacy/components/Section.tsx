import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function Section({ id, title, children, delay = 0 }: { id: string; title: string; children: ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      id={id}
      className="py-16 px-4 max-w-4xl mx-auto text-charcoal"
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">{title}</h2>
      {children}
    </motion.section>
  );
}