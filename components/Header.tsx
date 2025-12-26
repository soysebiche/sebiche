'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-charcoal/80 backdrop-blur-md text-white py-4 px-4 z-20"
    >
      <nav className="max-w-4xl mx-auto flex justify-between items-center" role="navigation" aria-label="Main navigation">
        <a href="/" className="flex items-baseline space-x-2">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="flex items-baseline"
          >
            <Image
              src="/logo.svg"
              alt="Sebiche Logo"
              width={32}
              height={32}
              aria-hidden="true"
              className="align-baseline"
            />
          </motion.div>
          <span className="text-turquoise font-['Montserrat'] text-2xl font-bold tracking-tight align-baseline">
            Sebiche
          </span>
        </a>
        <div className="flex items-center">
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 items-center">
            <li><a href="/#about" className="hover:text-turquoise transition">About</a></li>
            <li><a href="/#experience" className="hover:text-turquoise transition">Experience</a></li>
            <li><a href="/#projects" className="hover:text-turquoise transition">Case Studies</a></li>
            <li><a href="/#contact" className="hover:text-turquoise transition">Contact</a></li>
            <li><ThemeToggle /></li>
          </ul>
          <button
            className="sm:hidden text-turquoise hover:text-coral focus:outline-none focus:ring-2 focus:ring-coral"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="sm:hidden absolute top-full left-0 right-0 bg-charcoal/90 backdrop-blur-md text-white px-4 py-4 mt-1 z-10"
        >
          <div className="flex flex-col space-y-4">
            <a href="#about" className="hover:text-coral" onClick={toggleMenu}>About</a>
            <a href="#experience" className="hover:text-coral" onClick={toggleMenu}>Experience</a>
            <a href="#projects" className="hover:text-coral" onClick={toggleMenu}>Projects</a>
            <a href="#contact" className="hover:text-coral" onClick={toggleMenu}>Contact</a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}