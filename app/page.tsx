"use client"; // Pastikan ini ada karena kita menggunakan state & effect

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Zap, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCarousel from '@/components/EventCarousel';
import GameCard from '@/components/GameCard';
import SearchBar from '@/components/SearchBar';
import { getPublicGames } from '@/services/game'; // Import service seperti Vite
import type { Game } from '@/data/games'; // Pastikan tipe Game tersedia
import { slugify } from "@/lib/slug";


// Interface untuk tipe data partikel (tetap seperti sebelumnya)
interface Particle {
  id: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
}

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState<Game[]>([]); // Tambahkan state games seperti Vite
  const [loading, setLoading] = useState(true); // Tambahkan loading state
  const [particles, setParticles] = useState<Particle[]>([]);

  // Tambahkan useEffect untuk fetch data seperti Vite
  useEffect(() => {
    let mounted = true;

    async function fetchGames() {
      try {
        setLoading(true);
        const data = await getPublicGames();
        if (mounted) {
          setGames(data);
        }
      } catch (error) {
        console.error('Failed to fetch games:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchGames();

    return () => {
      mounted = false;
    };
  }, []);

  // Generate partikel di client-side (tetap seperti sebelumnya)
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const generatedParticles = [...Array(30)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 5 + Math.random() * 10,
        delay: Math.random() * 5,
      }));
      setParticles(generatedParticles);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const filteredGames = useMemo(() => {
    if (!searchQuery) return games;
    const q = searchQuery.toLowerCase();
    return games.filter(
      (game) =>
        game.name.toLowerCase().includes(q) ||
        game.category.toLowerCase().includes(q)
    );
  }, [searchQuery, games]);

  const popularGames = useMemo(() => {
    return games.filter((game) => game.isPopular);
  }, [games]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs - lebih banyak dan lebih dinamis */}
        <motion.div 
          className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px]"
          animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-secondary/20 blur-[120px]"
          animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.3, 1], rotate: [360, 180, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute left-1/3 bottom-1/4 h-64 w-64 rounded-full bg-neon-cyan/15 blur-[100px]"
          animate={{ x: [0, 50, -50, 0], y: [0, -30, 30, 0], scale: [1, 1.4, 1], rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-[100px]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Grid pattern overlay - lebih halus */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(195 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(195 100% 50%) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Floating particles - lebih banyak dan bervariasi */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className={`absolute rounded-full ${p.id % 3 === 0 ? 'bg-primary/50 h-2 w-2' : p.id % 3 === 1 ? 'bg-secondary/50 h-1 w-1' : 'bg-neon-cyan/50 h-1.5 w-1.5'}`}
            style={{ left: p.left, top: p.top }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      <Navbar />

      {/* Hero Section - Lebih dramatis dan memukau */}
      <section className="relative overflow-hidden pb-8 pt-24 md:pb-16 md:pt-32">
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8 text-center"
          >
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-6 py-3 backdrop-blur-sm cursor-pointer shadow-lg"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 100 }}
              whileHover={{ 
                scale: 1.1, 
                boxShadow: '0 0 40px hsl(195 100% 50% / 0.8), 0 0 80px hsl(100 85% 50% / 0.4)', 
                rotate: 5 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="h-5 w-5 text-primary" />
              </motion.div>
              <span className="text-sm font-semibold text-primary">Platform Top Up Terpercaya #1</span>
            </motion.div>
            
            <h1 className="font-gaming text-4xl font-bold md:text-6xl lg:text-7xl mb-4">
              <motion.span 
                className="gradient-text inline-block cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.05, 
                  textShadow: '0 0 60px hsl(195 100% 50% / 1), 0 0 120px hsl(100 85% 50% / 0.6)', 
                  rotateX: 10 
                }}
              >
                Top Up Game
              </motion.span>
              <br />
              <motion.span 
                className="text-foreground text-2xl md:text-4xl lg:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                whileHover={{ color: 'hsl(195 100% 50%)', scale: 1.02 }}
              >
                Tercepat & Termurah
              </motion.span>
            </h1>
            
            {/* CTA Button untuk kesan pertama yang menarik */}
           
          </motion.div>

          {/* Event Carousel - Dengan efek hover yang lebih smooth */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-3xl blur-xl" />
              <EventCarousel />
            </motion.div>
          )}
        </div>
      </section>

      {/* Popular Games Section - Diubah menjadi grid statis tanpa scroll, hover lebih elegan dan profesional */}
<section className="py-8 md:py-16">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-8 flex items-center gap-4"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg">
        <Zap className="h-6 w-6 text-primary-foreground" />
      </div>
      <div>
        <h2 className="font-gaming text-2xl font-bold text-foreground md:text-3xl">
          Game Populer
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">Pilih game favoritmu dan top up sekarang!</p>
      </div>
    </motion.div>

    {/* Grid statis tanpa carousel, responsif */}
    <motion.div 
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {popularGames.map((game, index) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ 
            scale: 1.05, 
            y: -5, 
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
          }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          viewport={{ once: true }}
          className="cursor-pointer"
        >
          <GameCard
            slug={slugify(game.name)}
            name={game.name}
            image={game.image}
            category={game.category}
            isPopular={game.isPopular}
            delay={0}
          />
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

{/* All Games Section - Hover lebih elegan dan profesional */}
<section id="games-section" className="py-8 md:py-16">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg">
          <Gamepad2 className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-gaming text-2xl font-bold text-foreground md:text-3xl">
            Semua Game
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">Temukan game impianmu di sini</p>
        </div>
      </div>
      <div className="w-full md:w-80">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
    </motion.div>

    <motion.div 
      className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {filteredGames.map((game, index) => (
        <motion.div
          key={game.id}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ 
            scale: 1.05, 
            y: -5, 
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' 
          }}
          transition={{ duration: 0.3, delay: index * 0.02 }}
          viewport={{ once: true }}
          className="cursor-pointer"
        >
          <GameCard
            slug={slugify(game.name)}
            name={game.name}
            image={game.image}
            category={game.category}
            isPopular={game.isPopular}
            delay={0}
          />
        </motion.div>
      ))}
    </motion.div>

    {filteredGames.length === 0 && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-12 text-center"
      >
        <Gamepad2 className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">
          Game tidak ditemukan. Coba kata kunci lain.
        </p>
      </motion.div>
    )}
  </div>
</section>

      <Footer />
    </div>
  );
};

export default Index;