"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Receipt, CheckCircle, XCircle, Clock, Loader2, ArrowLeft } from 'lucide-react';
import Link from "next/link";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getTransactionByInvoice, Transaction, dummyTransactions } from '@/data/transactions';

const StatusBadge: React.FC<{ status: Transaction['status'] }> = ({ status }) => {
  const config = {
    pending: {
      icon: Clock,
      text: 'Menunggu Pembayaran',
      className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    },
    processing: {
      icon: Loader2,
      text: 'Diproses',
      className: 'bg-primary/10 text-primary border-primary/30',
    },
    success: {
      icon: CheckCircle,
      text: 'Berhasil',
      className: 'bg-secondary/10 text-secondary border-secondary/30',
    },
    failed: {
      icon: XCircle,
      text: 'Gagal',
      className: 'bg-destructive/10 text-destructive border-destructive/30',
    },
  };

  const { icon: Icon, text, className } = config[status];

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 ${className}`}>
      <Icon className={`h-4 w-4 ${status === 'processing' ? 'animate-spin' : ''}`} />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

const CekTransaksi: React.FC = () => {
  const [invoiceId, setInvoiceId] = useState('');
  const [searchResult, setSearchResult] = useState<Transaction | null | undefined>(undefined);
  const [isSearching, setIsSearching] = useState(false);
  const [showRecent, setShowRecent] = useState(true);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceId.trim()) return;

    setIsSearching(true);
    setShowRecent(false);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const result = getTransactionByInvoice(invoiceId.trim());
    setSearchResult(result || null);
    setIsSearching(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pb-16 pt-24 md:pt-28">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-secondary">
            <Receipt className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-gaming text-2xl font-bold text-foreground md:text-3xl">
            Cek Status Transaksi
          </h1>
          <p className="mt-2 text-muted-foreground">
            Masukkan Invoice ID untuk melihat status pesanan kamu
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-xl"
        >
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
              placeholder="Contoh: IRX-20260108-001"
              className="gaming-input pl-12 pr-28"
            />
            <button
              type="submit"
              disabled={isSearching || !invoiceId.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-linear-to-br from-primary to-neon-cyan px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Cari'
              )}
            </button>
          </form>
        </motion.div>

        {/* Search Result */}
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-center"
            >
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Mencari transaksi...</p>
            </motion.div>
          ) : searchResult === null ? (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-center"
            >
              <XCircle className="mx-auto h-12 w-12 text-destructive" />
              <p className="mt-4 text-lg font-medium text-foreground">
                Transaksi Tidak Ditemukan
              </p>
              <p className="mt-2 text-muted-foreground">
                Pastikan Invoice ID yang kamu masukkan sudah benar.
              </p>
            </motion.div>
          ) : searchResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto mt-8 max-w-2xl"
            >
              <div className="gaming-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Invoice ID</p>
                    <p className="font-gaming text-lg font-bold text-primary">
                      {searchResult.invoiceId}
                    </p>
                  </div>
                  <StatusBadge status={searchResult.status} />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-muted/30 p-4">
                    <p className="text-sm text-muted-foreground">Game</p>
                    <p className="font-medium text-foreground">{searchResult.gameName}</p>
                  </div>
                  <div className="rounded-lg bg-muted/30 p-4">
                    <p className="text-sm text-muted-foreground">Item</p>
                    <p className="font-medium text-foreground">{searchResult.productName}</p>
                  </div>
                  <div className="rounded-lg bg-muted/30 p-4">
                    <p className="text-sm text-muted-foreground">User ID</p>
                    <p className="font-medium text-foreground">
                      {searchResult.userId}
                      {searchResult.serverId && ` (${searchResult.serverId})`}
                    </p>
                  </div>
                  <div className="rounded-lg bg-muted/30 p-4">
                    <p className="text-sm text-muted-foreground">Pembayaran</p>
                    <p className="font-medium text-foreground">{searchResult.paymentMethod}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/50 pt-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Pembayaran</p>
                    <p className="font-gaming text-xl font-bold text-secondary">
                      {formatPrice(searchResult.amount)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Waktu Transaksi</p>
                    <p className="text-sm font-medium text-foreground">
                      {formatDate(searchResult.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Recent Transactions (Demo) - Limited to 15 */}
        {showRecent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-12 max-w-4xl"
          >
            <h2 className="mb-4 font-gaming text-lg font-bold text-foreground">
              15 Transaksi Terbaru (Demo)
            </h2>
            <p className="mb-6 text-sm text-muted-foreground">
              Klik salah satu invoice di bawah untuk melihat detailnya
            </p>

            <div className="space-y-3">
              {dummyTransactions.slice(0, 15).map((transaction, index) => (
                <motion.button
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02, x: 8 }}
                  transition={{ delay: 0.05 * index }}
                  onClick={() => {
                    setInvoiceId(transaction.invoiceId);
                    setSearchResult(transaction);
                    setShowRecent(false);
                  }}
                  className="group relative w-full overflow-hidden rounded-xl border border-primary/20 bg-linear-to-br from-card/80 to-card/40 p-4 text-left transition-all hover:border-primary/50 hover:shadow-[0_0_20px_hsl(195,100%,50%,0.2)]"
                >
                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="hidden h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-secondary/20 sm:flex"
                        whileHover={{ rotate: 10 }}
                      >
                        <Receipt className="h-6 w-6 text-primary" />
                      </motion.div>
                      <div>
                        <p className="font-medium text-primary group-hover:text-primary">{transaction.invoiceId}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.gameName} - {transaction.productName}
                        </p>
                      </div>
                    </div>
                    <div className="hidden items-center gap-4 sm:flex">
                      <StatusBadge status={transaction.status} />
                      <p className="font-medium text-foreground">
                        {formatPrice(transaction.amount)}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CekTransaksi;
