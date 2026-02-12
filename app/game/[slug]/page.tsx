"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, AlertCircle, User, Server, CreditCard, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getPublicGameBySlug } from '@/services/game';
import { createTransaction, processTransaction } from '@/services/transaction';
import type { Game, Product } from '@/data/games';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

// Fungsi untuk cek user ID
async function checkUserId(gameSlug: string, userId: string, serverId?: string) {
 const BACKEND_URL = 'https://api.irxplay.com';

const url = `${BACKEND_URL}/api/games/${gameSlug}/check-user?userId=${userId}${serverId ? `&serverId=${serverId}` : ''}`;
const res = await fetch(url);

  console.log('checkUserId response status:', res.status);

  if (!res.ok) {
    let errorMsg = 'User ID tidak valid';
    try {
      const errData = await res.json();
      if (errData?.error) errorMsg = errData.error;
    } catch {}
    throw new Error(errorMsg);
  }

  const data = await res.json();
  console.log('checkUserId response data:', data);

  return data.data as string; // ini nickname
}




const paymentMethods = [
  { id: 'qris', name: 'QRIS', icon: '🔲' },
  { id: 'dana', name: 'Dana', icon: '💙' },
  { id: 'gopay', name: 'GoPay', icon: '💚' },
  { id: 'ovo', name: 'OVO', icon: '💜' },
  { id: 'shopeepay', name: 'ShopeePay', icon: '🧡' },
  { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
];

const GameDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [serverId, setServerId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [nickname, setNickname] = useState<string | null>(null);
  const [idError, setIdError] = useState<string | null>(null);
  const [checkingId, setCheckingId] = useState(false);

  // Fetch data game
  useEffect(() => {
    if (!slug) return;

    const fetchGame = async () => {
      try {
        const result = await getPublicGameBySlug(slug);
        if (!result) throw new Error("Game tidak ditemukan");

        // Tentukan apakah game membutuhkan server
        result.requiresServer = result.name.toLowerCase() !== "free fire";

        setGame(result);
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description: 'Gagal memuat data game dari server',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [slug]);

  // Cek user ID dengan debounce
  useEffect(() => {
  if (!userId || !game) return;

  const timer = setTimeout(async () => {
    try {
      setCheckingId(true);
      setIdError(null);

      const nick = await checkUserId(
        slug!,
        userId,
        game.requiresServer ? serverId : undefined
      );

      setNickname(nick); // <-- langsung string
    } catch (err: unknown) {
      setNickname(null);
      setIdError(err instanceof Error ? err.message : "User ID tidak valid");
    } finally {
      setCheckingId(false);
    }
  }, 500);

  return () => clearTimeout(timer);
}, [userId, serverId, slug, game]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 pt-24">
          <div className="text-center">
            <AlertCircle className="mx-auto h-16 w-16 text-destructive" />
            <h1 className="mt-4 font-gaming text-2xl font-bold text-foreground">
              Game Tidak Ditemukan
            </h1>
            <p className="mt-2 text-muted-foreground">
              Game yang kamu cari tidak tersedia.
            </p>
            <button
              onClick={() => router.push('/')}
              className="gaming-button mt-6"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleOrder = async () => {
    if (!user) {
      toast({
        title: 'Login Diperlukan',
        description: 'Silakan login terlebih dahulu untuk melakukan transaksi.',
        variant: 'destructive',
      });
      router.push('/login');
      return;
    }

    if (!nickname) {
      toast({
        title: 'User ID Tidak Valid',
        description: 'Pastikan User ID sudah benar sebelum melakukan transaksi.',
        variant: 'destructive',
      });
      return;
    }

    if (!userId || !selectedProduct || !selectedPayment) {
      toast({
        title: 'Data Belum Lengkap',
        description: 'Lengkapi semua data pesanan.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsProcessing(true);

      const randomDigits = Math.floor(100 + Math.random() * 900);
      const invoiceNumber = `IRX-${Date.now()}-${randomDigits}`;

      const transactionData = await createTransaction({
        invoiceNumber,
        customerId: userId,
        customerPhone: '',
        gameId: game.id,
        nominalId: selectedProduct.id,
        basePrice: selectedProduct.originalPrice!,
        sellingPrice: selectedProduct.price,
        serverId: game.requiresServer ? serverId : undefined,
      });

      const transactionId = transactionData.id;

      try {
        await processTransaction(transactionId);
        toast({
          title: 'Processing Dimulai',
          description: 'Transaksi sedang diproses oleh provider.',
        });
      } catch (processError) {
        console.error('Process error:', processError);
        toast({
          title: 'Peringatan',
          description: 'Transaksi dibuat, tapi processing gagal. Coba lagi nanti.',
          variant: 'destructive',
        });
      }

      toast({
        title: 'Pesanan Berhasil',
        description: 'Pesanan berhasil dibuat. Silakan lakukan pembayaran.',
      });

      router.push(`/cek-transaksi?invoice=${invoiceNumber}`);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Gagal Membuat Pesanan',
        description: 'Terjadi kesalahan saat membuat pesanan.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pb-16 pt-24 md:pt-28">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/')}
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </motion.button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Game Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
            <div className="gaming-card overflow-hidden">
              <div className="aspect-[4/5]">
                <img src={game.image} alt={game.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-primary">{game.category}</p>
                <h1 className="mt-1 font-gaming text-xl font-bold text-foreground">{game.name}</h1>
                <p className="mt-2 text-sm text-muted-foreground">{game.description}</p>
              </div>
            </div>
          </motion.div>

          {/* Order Form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Step 1: User ID */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="gaming-card p-4 md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-primary-foreground">
                  1
                </div>
                <h2 className="font-gaming text-lg font-bold text-foreground">Masukkan Data Akun</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                    <User className="h-4 w-4 text-primary" />
                    User ID
                  </label>
                  <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Masukkan User ID" className="gaming-input" />
                  <div className="mt-1 text-sm">
                    {checkingId && <span className="text-gray-500">Memeriksa ID...</span>}
                    {nickname && <span className="text-green-600">Nickname: {nickname}</span>}
                    {idError && <span className="text-red-600">{idError}</span>}
                  </div>
                </div>

                {game.requiresServer && (
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                      <Server className="h-4 w-4 text-primary" />
                      Server ID (Opsional)
                    </label>
                    <input type="text" value={serverId} onChange={(e) => setServerId(e.target.value)} placeholder="Masukkan Server ID" className="gaming-input" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Step 2: Select Product */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="gaming-card p-4 md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-primary-foreground">
                  2
                </div>
                <h2 className="font-gaming text-lg font-bold text-foreground">Pilih Nominal</h2>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {game.products.map((product) => (
                  <motion.button
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedProduct(product)}
                    className={`relative rounded-xl border p-3 text-left transition-all ${
                      selectedProduct?.id === product.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 bg-muted/30 hover:border-primary/50'
                    }`}
                  >
                    {selectedProduct?.id === product.id && (
                      <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                    <p className="text-sm font-medium text-foreground">{product.name}</p>
                    <p className="mt-1 text-xs font-bold text-primary">{formatPrice(product.price)}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Step 3: Payment Method */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="gaming-card p-4 md:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-primary-foreground">
                  3
                </div>
                <h2 className="font-gaming text-lg font-bold text-foreground">Pilih Pembayaran</h2>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`relative flex items-center gap-3 rounded-xl border p-3 transition-all ${
                      selectedPayment === method.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border/50 bg-muted/30 hover:border-primary/50'
                    }`}
                  >
                    {selectedPayment === method.id && (
                      <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </div>
                    )}
                    <span className="text-xl">{method.icon}</span>
                    <span className="text-sm font-medium text-foreground">{method.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Order Summary */}
            <AnimatePresence>
              {selectedProduct && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="gaming-card p-4 md:p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <h2 className="font-gaming text-lg font-bold text-foreground">Ringkasan Pesanan</h2>
                  </div>

                  <div className="space-y-3 rounded-lg bg-muted/30 p-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Game</span>
                      <span className="font-medium text-foreground">{game.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Item</span>
                      <span className="font-medium text-foreground">{selectedProduct.name}</span>
                    </div>
                    {userId && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">User ID</span>
                        <span className="font-medium text-foreground">{userId}{serverId && ` (${serverId})`}</span>
                      </div>
                    )}
                    <div className="border-t border-border/50 pt-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-foreground">Total</span>
                        <span className="font-gaming text-lg font-bold text-primary">{formatPrice(selectedProduct.price)}</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                    whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                    onClick={handleOrder}
                    disabled={isProcessing}
                    className="gaming-button mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Memproses...
                      </span>
                    ) : (
                      'Beli Sekarang'
                    )}
                  </motion.button>

                  {!user && (
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                      Kamu perlu <span className="text-primary">login</span> terlebih dahulu untuk melakukan transaksi.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameDetail;
