"use client";
import React from 'react';
import Link  from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Youtube, MessageCircle } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <motion.img
                src={logo.src}
                alt="IRXPlay"
                className="h-16 w-auto"
                whileHover={{ scale: 1.05 }}
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Platform top up game terpercaya dengan harga terbaik dan proses instan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-gaming text-sm font-bold uppercase tracking-wider text-primary">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/cek-transaksi" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Cek Transaksi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-gaming text-sm font-bold uppercase tracking-wider text-primary">
              Kontak
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>support@irxplay.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+62 812 3456 7890</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-gaming text-sm font-bold uppercase tracking-wider text-primary">
              Follow Us
            </h4>
            <div className="mt-4 flex gap-3">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Youtube className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 IRXPlay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
