"use client"; // Pastikan ini ada karena kita menggunakan state & effect

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Zap, Shield, Clock, Sparkles } from 'lucide-react';
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

const features = [
  {
    icon: Zap,
    title: 'Proses Instan',
    description: 'Diamond masuk dalam hitungan detik',
  },
  {
    icon: Shield,
    title: 'Aman & Terpercaya',
    description: 'Transaksi dijamin 100% aman',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Layanan pelanggan siap membantu',
  },
];

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
      const generatedParticles = [...Array(20)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 5 + Math.random() * 5,
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
      {/* Animated Background Elements - Tetap sama */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient orbs */}
        <motion.div 
          className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[100px]"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-secondary/20 blur-[100px]"
          animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute left-1/3 bottom-1/4 h-64 w-64 rounded-full bg-neon-cyan/10 blur-[80px]"
          animate={{ x: [0, 30, -30, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(195 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(195 100% 50%) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Floating particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute h-1 w-1 rounded-full bg-primary/40"
            style={{ left: p.left, top: p.top }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
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

      {/* Hero Section - Tetap sama */}
      <section className="relative overflow-hidden pb-8 pt-24 md:pb-16 md:pt-32">
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Platform Top Up Terpercaya #1</span>
            </motion.div>
            
            <h1 className="font-gaming text-3xl font-bold md:text-5xl lg:text-6xl">
              <motion.span 
                className="gradient-text inline-block"
                animate={{ 
                  textShadow: [
                    '0 0 20px hsl(195 100% 50% / 0.5)',
                    '0 0 40px hsl(100 85% 50% / 0.5)',
                    '0 0 20px hsl(195 100% 50% / 0.5)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Top Up Game
              </motion.span>
              <br />
              <span className="text-foreground">Tercepat & Termurah</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Dapatkan diamond dan voucher game favoritmu dengan harga terbaik. 
              Proses cepat, aman, dan terpercaya!
            </p>
          </motion.div>

          {/* Event Carousel - Tambahkan conditional agar muncul setelah loading */}
          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <EventCarousel />
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section - Perbaiki bg-linear-to-br ke bg-gradient-to-br */}
      <section className="relative py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-3 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-card/80 to-card/40 p-6 backdrop-blur-sm text-center hover:border-primary/50 hover:shadow-[0_0_30px_hsl(195,100%,50%,0.2)] transition-all duration-300"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon */}
                <motion.div 
                  className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="h-8 w-8 text-primary-foreground" />
                  
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-primary"
                    animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                
                <h3 className="relative font-gaming text-lg font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="relative mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Games Section - Perbaiki bg-linear-to-br ke bg-gradient-to-br */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="font-gaming text-xl font-bold text-foreground md:text-2xl">
              Game Populer
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
            {popularGames.map((game, index) => (
              <GameCard
                key={game.id}
                slug={slugify(game.name)}
                name={game.name}
                image={game.image}
                category={game.category}
                isPopular={game.isPopular}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Games Section - Perbaiki bg-linear-to-br ke bg-gradient-to-br */}
      <section id="games-section" className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Gamepad2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <h2 className="font-gaming text-xl font-bold text-foreground md:text-2xl">
                Semua Game
              </h2>
            </div>
            <div className="w-full md:w-80">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5 xl:grid-cols-6">
            {filteredGames.map((game, index) => (
              <GameCard
                key={game.id}
                slug={slugify(game.name)}
                name={game.name}
                image={game.image}
                category={game.category}
                isPopular={game.isPopular}
                delay={index * 0.03}
              />
            ))}
          </div>

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