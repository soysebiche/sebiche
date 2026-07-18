'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SwipeableHandlers, useSwipeable } from 'react-swipeable';

const projects = [
  {
    id: 1,
    title: 'Linio Cross-Border Marketplace',
    description: 'Boosted sales by 125% with UX optimization across 5 countries.',
    image: '/projects/linio.jpeg',
  },
  {
    id: 2,
    title: 'Liverpool Marketplace Expansion',
    description: 'Grew to 100+ sellers with a 78% increase in onboarding conversion.',
    image: '/projects/liverpool.jpeg',
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % projects.length),
    onSwipedRight: () => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length),
    trackMouse: true,
  });

  return (
    <section id="projects" className="py-12 bg-softGray">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-['Montserrat'] font-bold text-charcoal mb-8">
          Projects
        </h2>
        <div {...handlers} className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {projects.map((project) => (
              <div key={project.id} className="min-w-full flex-shrink-0 px-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <Image
                    src={project.image}
                    alt={`${project.title} logo`}
                    width={400}
                    height={400}
                    className="w-full max-w-[400px] mx-auto object-contain rounded-md mb-4"
                    loading="lazy"
                  />
                  <h3 className="text-xl font-semibold text-turquoise mb-2 font-['Montserrat']">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-turquoise' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}