"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);
  return (
    <div className="relative min-h-screen bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10"
          >
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </motion.div>

          <h1 className="font-gaming text-6xl font-bold text-foreground md:text-8xl">
            <span className="gradient-text">404</span>
          </h1>
          
          <p className="mt-4 font-gaming text-xl font-bold text-foreground md:text-2xl">
            Halaman Tidak Ditemukan
          </p>
          
          <p className="mt-2 text-muted-foreground">
            Oops! Halaman yang kamu cari tidak ada atau sudah dipindahkan.
          </p>

          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gaming-button mt-8 inline-flex items-center gap-2"
            >
              <Home className="h-5 w-5" />
              Kembali ke Beranda
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
