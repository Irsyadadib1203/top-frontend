"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Gamepad2, Receipt, ChevronDown, Home, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';  // Pastikan path benar
import logo from '@/assets/logo.png';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  to?: string;
  isActive?: boolean;
  closeMenu?: () => void;
}

function NavItem({
  icon: Icon,
  label,
  onClick,
  to,
  isActive,
  closeMenu,
}: NavItemProps) {
  const content = (
    <motion.div
      className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer ${
        isActive 
          ? 'bg-primary/20 text-primary' 
          : 'text-foreground/70 hover:text-primary hover:bg-primary/10'
      }`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative"
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.4 }}
      >
        <Icon className="h-4 w-4" />
      </motion.div>
      <span className="font-medium text-sm">{label}</span>
      
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 -z-10"
        initial={false}
        transition={{ duration: 0.3 }}
      />
      
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-gradient-to-r from-primary to-secondary"
        />
      )}
    </motion.div>
  );

  if (to) {
    return (
      <Link href={to} onClick={closeMenu}>
        {content}
      </Link>
    );
  }
  return <div onClick={onClick}>{content}</div>;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut } = useAuth();  // Perbaiki: gunakan user dan signOut (bukan isAuthenticated dan logout)
  const router = useRouter();
  const pathname = usePathname();

  const scrollToGames = () => {
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => {
        const gamesSection = document.getElementById('games-section');
        if (gamesSection) {
          gamesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const gamesSection = document.getElementById('games-section');
      if (gamesSection) {
        gamesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleLogout = () => {
    signOut();  // Perbaiki: gunakan signOut alih-alih logout
    setShowUserMenu(false);
    router.push('/');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-primary/20 bg-background/90 backdrop-blur-xl"
    >
      {/* Animated gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-2px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
      
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo with Store Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <motion.img
                src={logo.src}
                alt="IRXPlay"
                className="h-10 w-auto md:h-12 drop-shadow-[0_0_15px_hsl(195,100%,50%,0.5)]"
                animate={{ 
                  filter: [
                    'drop-shadow(0 0 15px hsl(195 100% 50% / 0.5))',
                    'drop-shadow(0 0 25px hsl(100 85% 50% / 0.5))',
                    'drop-shadow(0 0 15px hsl(195 100% 50% / 0.5))'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Sparkle effect */}
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-3 w-3 text-secondary" />
              </motion.div>
            </motion.div>
            
            {/* Store Name with Animation */}
            <motion.div 
              className="flex flex-col"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.span 
                className="font-gaming text-xl md:text-2xl font-bold gradient-text"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                IRXPlay
              </motion.span>
              <motion.span 
                className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Top Up Center
              </motion.span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 md:flex">
            <NavItem 
              icon={Home} 
              label="Home" 
              to="/" 
              isActive={pathname === '/'}
            />
            <NavItem 
              icon={Gamepad2} 
              label="Game" 
              onClick={scrollToGames}
            />
            <NavItem 
              icon={Receipt} 
              label="Cek Transaksi" 
              to="/cek-transaksi"
              isActive={pathname === '/cek-transaksi'}
            />
          </div>

          {/* Auth Section */}
          <div className="hidden items-center gap-4 md:flex">
            {!!user ? (  // Perbaiki: gunakan !!user alih-alih isAuthenticated
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_hsl(195,100%,50%,0.3)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <User className="h-4 w-4 text-primary-foreground" />
                  </motion.div>
                  <span className="font-medium text-foreground">{user?.name}</span>
                  <motion.div
                    animate={{ rotate: showUserMenu ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4 text-primary" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-primary/30 bg-card/95 backdrop-blur-xl shadow-[0_10px_40px_hsl(195,100%,50%,0.2)]"
                    >
                      <div className="border-b border-border/50 p-4 bg-gradient-to-r from-primary/10 to-secondary/10">
                        <p className="font-medium text-foreground">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                      <motion.button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-destructive transition-all hover:bg-destructive/10 hover:pl-6"
                        whileHover={{ x: 4 }}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Keluar</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login">
                <motion.button
                  className="relative overflow-hidden rounded-xl px-6 py-2.5 font-semibold text-primary-foreground"
                  style={{ background: 'var(--gradient-gaming)' }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px hsl(195 100% 50% / 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                  <span className="relative z-10">Masuk</span>
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="relative rounded-xl p-2 text-foreground transition-colors hover:bg-primary/10 md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden border-t border-primary/20 md:hidden"
            >
              <motion.div 
                className="flex flex-col gap-2 py-4"
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.1 } },
                  closed: {}
                }}
              >
                {[
                  { icon: Home, label: 'Home', to: '/' },
                  { icon: Gamepad2, label: 'Game', onClick: scrollToGames },
                  { icon: Receipt, label: 'Cek Transaksi', to: '/cek-transaksi' }
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -20 }
                    }}
                  >
                    {item.to ? (
                      <Link
                        href={item.to}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-primary/10 hover:pl-6 ${
                          pathname === item.to ? 'bg-primary/10 text-primary' : 'text-foreground/80'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ) : (
                      <button
                        onClick={item.onClick}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-foreground/80 transition-all hover:bg-primary/10 hover:pl-6"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    )}
                  </motion.div>
                ))}

                <motion.div 
                  className="mt-2 border-t border-primary/20 pt-4"
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 }
                  }}
                >
                  {!!user ? (  // Perbaiki: gunakan !!user alih-alih isAuthenticated
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10">
                        <motion.div 
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <User className="h-5 w-5 text-primary-foreground" />
                        </motion.div>
                        <div>
                          <p className="font-medium text-foreground">{user?.name}</p>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>
                      <motion.button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-destructive transition-all hover:bg-destructive/10 hover:pl-6"
                        whileHover={{ x: 4 }}
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Keluar</span>
                      </motion.button>
                    </div>
                  ) : (
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <motion.button 
                        className="w-full rounded-xl py-3 font-semibold text-primary-foreground"
                        style={{ background: 'var(--gradient-gaming)' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Masuk
                      </motion.button>
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;