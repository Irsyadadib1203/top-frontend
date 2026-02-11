"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import eventBanner1 from '@/assets/event-banner-1.jpg'; // Pastikan gambar ada di folder ini
import eventBanner2 from '@/assets/event-banner-2.jpg';
import eventBanner3 from '@/assets/event-banner-3.jpg';

const events = [
  {
    id: 1,
    image: eventBanner1,
    title: 'Mobile Legends New Hero!',
    description: 'Dapatkan bonus diamond untuk setiap pembelian!',
  },
  {
    id: 2,
    image: eventBanner2,
    title: 'Free Fire Battle Royale',
    description: 'Diskon hingga 20% untuk semua top up!',
  },
  {
    id: 3,
    image: eventBanner3,
    title: 'Genshin Impact Update',
    description: 'Primogems dengan harga spesial!',
  },
];

const EventCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 10000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="aspect-[21/9] md:aspect-[3/1]"> {/* Perbaiki: Tambah [] untuk aspect ratio valid */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <div className="relative h-full w-full">
              <img
                src={events[currentIndex].image.src} // Tetap .src untuk Next.js (objek import)
                alt={events[currentIndex].title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" /> {/* Perbaiki: bg-linear-to-t ke bg-gradient-to-t */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-gaming text-xl font-bold text-foreground md:text-3xl neon-text-blue"
                >
                  {events[currentIndex].title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 text-sm text-foreground/80 md:text-lg"
                >
                  {events[currentIndex].description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/50 backdrop-blur-sm transition-all hover:bg-primary/50 md:left-4 md:h-12 md:w-12"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/50 backdrop-blur-sm transition-all hover:bg-primary/50 md:right-4 md:h-12 md:w-12"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-4">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-primary'
                : 'w-2 bg-foreground/30 hover:bg-foreground/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;