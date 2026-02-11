"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation"
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, User } from 'lucide-react';  // Tambah User icon
import { useAuth } from '@/hooks/useAuth';  // Pastikan path benar
import { toast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');  // Tambah state untuk name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();  // Perbaiki destructure: gunakan signIn dan signUp
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Email dan password harus diisi',
        variant: 'destructive',
      });
      return;
    }

    if (!isLogin && !name) {  // Tambah validasi name untuk registrasi
      toast({
        title: 'Error',
        description: 'Nama harus diisi',
        variant: 'destructive',
      });
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Password tidak sama',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password minimal 6 karakter',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      let result;
      if (isLogin) {
        result = await signIn(email, password);  // Gunakan signIn untuk login
      } else {
        result = await signUp(email, password, name);  // Gunakan signUp untuk registrasi dengan name
      }
      
      if (result.error) {
        toast({
          title: 'Error',
          description: result.error.message || 'Terjadi kesalahan',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Berhasil!',
          description: isLogin ? 'Login berhasil' : 'Registrasi berhasil',
        });
        router.push('/');
      }
    } catch  {
      toast({
        title: 'Error',
        description: 'Terjadi kesalahan. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto flex min-h-screen items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Back Button */}
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>

          <div className="gaming-card overflow-hidden p-6 md:p-8">
            {/* Logo */}
            <div className="mb-6 text-center">
              <motion.img
                src={logo.src}
                alt="IRXPlay"
                className="mx-auto h-16 w-auto md:h-20"
                whileHover={{ scale: 1.05 }}
              />
              <h1 className="mt-4 font-gaming text-xl font-bold text-foreground md:text-2xl">
                {isLogin ? 'Selamat Datang!' : 'Daftar Akun'}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {isLogin
                  ? 'Masuk untuk melanjutkan transaksi'
                  : 'Buat akun untuk mulai top up'}
              </p>
            </div>

            {/* Toggle */}
            <div className="mb-6 flex rounded-lg bg-muted/50 p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  isLogin
                    ? 'bg-linear-to-r from-primary to-neon-cyan text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Masuk
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  !isLogin
                    ? 'bg-linear-to-r from-primary to-neon-cyan text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Daftar
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (  // Tambah field name hanya untuk registrasi
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      className="gaming-input pl-12"
                    />
                  </div>
                </motion.div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="gaming-input pl-12"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="gaming-input pl-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Ulangi password"
                      className="gaming-input pl-12"
                    />
                  </div>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                className="gaming-button w-full disabled:cursor-not-allowed disabled:opacity-50"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </span>
                ) : isLogin ? (
                  'Masuk'
                ) : (
                  'Daftar'
                )}
              </motion.button>
            </form>

            {/* Demo Info */}
            <div className="mt-6 rounded-lg bg-muted/30 p-4">
              <p className="text-center text-xs text-muted-foreground">
                <span className="font-semibold text-primary">Demo Mode:</span> Gunakan email apapun 
                dan password minimal 6 karakter untuk login.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;