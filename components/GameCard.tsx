"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { s } from 'framer-motion/client';

interface GameCardProps {
  slug: string;
  name: string;
  image: string;
  category: string;
  isPopular?: boolean;
  delay?: number;
}

const GameCard: React.FC<GameCardProps> = ({ slug, name, image, category, isPopular, delay = 0 }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push(`/game/${slug}`)}
      className="gaming-card group cursor-pointer glow-border"
    >
      <div className="relative aspect-4/5 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60" />
        
        {isPopular && (
          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-linear-to-r from-secondary to-neon-green px-2 py-1">
            <Sparkles className="h-3 w-3 text-secondary-foreground" />
            <span className="text-xs font-bold text-secondary-foreground">Popular</span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            {category}
          </p>
          <h3 className="mt-1 font-gaming text-sm font-bold text-foreground md:text-base">
            {name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
