import dynamic from 'next/dynamic';
import Head from 'next/head';
import Script from 'next/script';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Section from '../components/Section';
import Footer from '../components/Footer';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Carousel = dynamic(() => import('../components/Carousel'), { ssr: false });
const ContactForm = dynamic(() => import('../components/ContactForm'), { ssr: false });

interface JourneyItem {
  year: string;
  title: string;
  details: string;
}

export default function Home({ title, description }: { title: string; description: string }) {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [surprise, setSurprise] = useState<string | null>(null);

  const journey: JourneyItem[] = [
    { year: '2015', title: 'Started as an Intern at Linio Peru', details: 'Began my career...' },
    { year: '2018', title: 'Graduated with a BBA from Universidad del Pacífico', details: 'Earned my degree...' },
    { year: '2020', title: 'Started as Manager at Linio Mexico', details: 'Led regional teams...' },
    { year: '2022', title: 'Started as Manager at Liverpool', details: 'Grew the marketplace...' },
    { year: '2024', title: 'Began the MADI program at SMU', details: 'Pursuing advanced...' },
  ];

  const surprises: string[] = [
    'I once redesigned a checkout flow in 48 hours!',
    'I’m obsessed with ceviche—hence the name Sebiche.',
    'I’ve led teams across 5 countries!',
    'I boosted sales by 125% with a single UX tweak.',
  ];

  const toggleDetails = (year: string) => setSelectedYear(selectedYear === year ? null : year);
  const showSurprise = () => {
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    setSurprise(randomSurprise);
    window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => setSurprise(null), 3000);
  };
  const getLineHeight = () => {
    if (!selectedYear) return '0%';
    const index = journey.findIndex((item) => item.year === selectedYear);
    return `${(index + 1) * 20}%`;
  };

  return (
    <div className="min-h-screen bg-softGray">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Sebastian Napuri, UX, UI, eCommerce, portfolio, Peru" />
        <meta name="author" content="Sebastian Napuri Mendoza" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/sebastian.jpg" />
        <meta property="og:url" content="https://sebiche.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Montserrat:wght@700&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Montserrat:wght@700&display=swap&subset=latin-ext"
          rel="stylesheet"
          media="print"
          onLoad={() => "this.media='all'"}
        />
      </Head>
      <Header />
      <Hero />
      <Section id="about" title="About Me">
        <div className="w-56 h-56 mx-auto mb-4 rounded-full overflow-hidden">
          <Image
            src="/sebastian.jpg"
            alt="Sebastian Napuri Mendoza, UX/UI Leader"
            width={224}
            height={224}
            className="object-cover w-full h-full"
            loading="lazy"
            sizes="(max-width: 640px) 224px, 224px"
          />
        </div>
        <p className="text-base sm:text-lg mb-4">
          From a curious intern in Lima to a global eCommerce leader, my journey blends Peruvian grit with cutting-edge tech.
        </p>
        <p className="text-base sm:text-lg mb-4">
          With over 9 years shaping marketplaces, I’ve turned challenges into victories—like boosting sales by 125% or redesigning UX to convert 78% better.
        </p>
        <p className="text-base sm:text-lg mb-6">
          Inspired by ceviche’s perfect balance, I craft digital experiences that are bold, precise, and unforgettable.
        </p>
        <button
          onClick={showSurprise}
          className="mx-auto block px-6 py-2 bg-turquoise text-white rounded-full hover:bg-coral transition mb-6"
          aria-label="Reveal a fun fact about Sebastian"
          role="button"
        >
          Surprise Me!
        </button>
        {surprise && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-base sm:text-lg text-turquoise mb-6"
            role="alert"
          >
            {surprise}
          </motion.p>
        )}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-lg sm:text-xl font-semibold text-turquoise mb-4">My Journey</h3>
          <div className="relative pl-6" role="list">
            <motion.div
              className="absolute left-0 top-0 w-0.5 bg-turquoise"
              initial={{ height: '0%' }}
              animate={{ height: getLineHeight() }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
            {journey.map((item) => (
              <div
                key={item.year}
                className="mb-6 cursor-pointer"
                onClick={() => toggleDetails(item.year)}
                role="listitem"
              >
                <motion.div
                  className="absolute w-4 h-4 bg-turquoise rounded-full -left-2 top-1"
                  animate={{ scale: selectedYear === item.year ? 1.5 : 1 }}
                  transition={{ duration: 0.3 }}
                />
                <p className="text-sm sm:text-base text-coral">{item.year}</p>
                <p className="text-base sm:text-lg">{item.title}</p>
                {selectedYear === item.year && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm sm:text-base text-gray-600 mt-2"
                  >
                    {item.details}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section id="experience" title="Experience" delay={0.4}>
        <div className="space-y-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold text-turquoise">Marketplace BU Manager</h3>
            <p className="text-coral text-sm sm:text-base">Servicios Liverpool | 06/2022 - 07/2024</p>
            <ul className="list-disc list-inside mt-2 text-sm sm:text-base">
              <li>Led Crossborder Marketplace project, growing to 100+ sellers.</li>
              <li>Reduced response times by 35% with automation tools.</li>
              <li>Increased seller onboarding conversion by 78% via UX redesign.</li>
            </ul>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold text-turquoise">Regional Hardlines Cross-Border Commercial Manager</h3>
            <p className="text-coral text-sm sm:text-base">Linio México | 01/2020 - 05/2022</p>
            <ul className="list-disc list-inside mt-2 text-sm sm:text-base">
              <li>Boosted cross-border sales by 125% with growth strategies.</li>
              <li>Improved operational efficiency by 40% via UX optimization.</li>
              <li>Led a team of 10 across 5 countries.</li>
            </ul>
          </div>
        </div>
      </Section>
      <Carousel />
      <ContactForm />
      <Footer />
      <Script
        src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"
        strategy="lazyOnload"
      />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Sebastian Napuri Mendoza | UX/UI Portfolio",
      description: "Explore the portfolio of Sebastian Napuri Mendoza...",
    },
  };
}