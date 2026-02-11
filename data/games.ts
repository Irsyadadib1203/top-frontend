export interface Game {
  id: string;
  slug: string;
  name: string;
  image: string;
  category: string;
  isPopular?: boolean;
  description: string;
  products: Product[];
  requiresServer?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
}

export const games: Game[] = [
  {
    id: 'mobile-legends',
    slug: 'mobile-legends',
    name: 'Mobile Legends',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=500&fit=crop',
    category: 'MOBA',
    isPopular: true,
    description: 'Top up Diamond Mobile Legends dengan harga termurah dan proses instan!',
    products: [
      { id: 'ml-86', name: '86 Diamonds', price: 19000 },
      { id: 'ml-172', name: '172 Diamonds', price: 38000 },
      { id: 'ml-257', name: '257 Diamonds', price: 57000 },
      { id: 'ml-344', name: '344 Diamonds', price: 76000 },
      { id: 'ml-429', name: '429 Diamonds', price: 95000 },
      { id: 'ml-514', name: '514 Diamonds', price: 114000 },
      { id: 'ml-706', name: '706 Diamonds', price: 152000 },
      { id: 'ml-878', name: '878 Diamonds', price: 190000 },
      { id: 'ml-1050', name: '1050 Diamonds', price: 228000 },
      { id: 'ml-2195', name: '2195 Diamonds', price: 456000 },
    ],
  },
  {
    id: 'free-fire',
    slug: 'free-fire',
    name: 'Free Fire',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=500&fit=crop',
    category: 'Battle Royale',
    isPopular: true,
    description: 'Top up Diamond Free Fire dengan harga termurah!',
    products: [
      { id: 'ff-70', name: '70 Diamonds', price: 10000 },
      { id: 'ff-140', name: '140 Diamonds', price: 20000 },
      { id: 'ff-355', name: '355 Diamonds', price: 50000 },
      { id: 'ff-720', name: '720 Diamonds', price: 100000 },
      { id: 'ff-1450', name: '1450 Diamonds', price: 200000 },
    ],
  },
  {
    id: 'genshin-impact',
    slug: 'genshin-impact',
    name: 'Genshin Impact',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=500&fit=crop',
    category: 'RPG',
    isPopular: true,
    description: 'Top up Genesis Crystal Genshin Impact!',
    products: [
      { id: 'gi-60', name: '60 Genesis Crystals', price: 16000 },
      { id: 'gi-300', name: '300 Genesis Crystals', price: 79000 },
      { id: 'gi-980', name: '980 Genesis Crystals', price: 249000 },
      { id: 'gi-1980', name: '1980 Genesis Crystals', price: 479000 },
      { id: 'gi-3280', name: '3280 Genesis Crystals', price: 799000 },
      { id: 'gi-6480', name: '6480 Genesis Crystals', price: 1599000 },
    ],
  },
  {
    id: 'pubg-mobile',
    slug: 'pubg-mobile',
    name: 'PUBG Mobile',
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=500&fit=crop',
    category: 'Battle Royale',
    isPopular: true,
    description: 'Top up UC PUBG Mobile dengan harga terbaik!',
    products: [
      { id: 'pubg-60', name: '60 UC', price: 15000 },
      { id: 'pubg-325', name: '325 UC', price: 75000 },
      { id: 'pubg-660', name: '660 UC', price: 150000 },
      { id: 'pubg-1800', name: '1800 UC', price: 380000 },
      { id: 'pubg-3850', name: '3850 UC', price: 760000 },
    ],
  },
  {
    id: 'valorant',
    slug: 'valorant',
    name: 'Valorant',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?w=400&h=500&fit=crop',
    category: 'FPS',
    description: 'Top up Valorant Points dengan harga termurah!',
    products: [
      { id: 'vp-125', name: '125 VP', price: 15000 },
      { id: 'vp-420', name: '420 VP', price: 50000 },
      { id: 'vp-700', name: '700 VP', price: 80000 },
      { id: 'vp-1375', name: '1375 VP', price: 150000 },
      { id: 'vp-2400', name: '2400 VP', price: 250000 },
      { id: 'vp-4000', name: '4000 VP', price: 400000 },
    ],
  },
  {
    id: 'honkai-star-rail',
    slug: 'honkai-star-rail',
    name: 'Honkai Star Rail',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f7e9e?w=400&h=500&fit=crop',
    category: 'RPG',
    description: 'Top up Oneiric Shard Honkai Star Rail!',
    products: [
      { id: 'hsr-60', name: '60 Oneiric Shards', price: 16000 },
      { id: 'hsr-300', name: '300 Oneiric Shards', price: 79000 },
      { id: 'hsr-980', name: '980 Oneiric Shards', price: 249000 },
      { id: 'hsr-1980', name: '1980 Oneiric Shards', price: 479000 },
    ],
  },
  {
    id: 'arena-of-valor',
    slug: 'arena-of-valor',
    name: 'Arena of Valor',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop',
    category: 'MOBA',
    description: 'Top up Voucher Arena of Valor!',
    products: [
      { id: 'aov-50', name: '50 Vouchers', price: 10000 },
      { id: 'aov-110', name: '110 Vouchers', price: 20000 },
      { id: 'aov-300', name: '300 Vouchers', price: 50000 },
      { id: 'aov-600', name: '600 Vouchers', price: 100000 },
    ],
  },
  {
    id: 'call-of-duty-mobile',
    slug: 'call-of-duty-mobile',
    name: 'Call of Duty Mobile',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=500&fit=crop',
    category: 'FPS',
    description: 'Top up CP Call of Duty Mobile!',
    products: [
      { id: 'cod-80', name: '80 CP', price: 16000 },
      { id: 'cod-400', name: '400 CP', price: 79000 },
      { id: 'cod-800', name: '800 CP', price: 159000 },
      { id: 'cod-2000', name: '2000 CP', price: 399000 },
    ],
  },
];

export const getGameById = (id: string): Game | undefined => {
  return games.find((game) => game.id === id);
};
export const checkUserId = async (gameSlug: string, userId: string, serverId?: string) => {
  try {
    const res = await fetch(`/api/games/${gameSlug}/check-user?userId=${userId}${serverId ? `&serverId=${serverId}` : ''}`);
    if (!res.ok) throw new Error('User ID tidak valid');
    return await res.json(); // Contoh: { nickname: string }
  } catch (error) {
    throw error;
  }
};
export const checkServerId = async (gameSlug: string, serverId: string) => {
  try {
    const res = await fetch(`/api/games/${gameSlug}/check-server?serverId=${serverId}`); 
    if (!res.ok) throw new Error('Server ID tidak valid');
    return await res.json(); // Contoh: { serverName: string }
  } catch (error) {
    throw error;
  } 
};
