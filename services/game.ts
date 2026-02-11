// File: services/games.ts (atau sesuai dengan struktur Anda)
// Ganti import Supabase dengan fetch (atau install axios jika perlu)
// import axios from 'axios'; // Jika ingin menggunakan axios

import type { Game, Product } from "@/data/games";

// Interface untuk response dari API Laravel (untuk menghindari 'any')
interface ApiGameResponse {
  id: string;
  slug: string;
  name: string;
  image: string;
  category: string;
  isPopular: boolean;
  description: string;
  products: ApiProductResponse[];
}

interface ApiProductResponse {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
}

// Asumsikan base URL API Laravel
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

/* =====================
 * GET ALL PUBLIC GAMES
 * ===================== */
export async function getPublicGames(): Promise<Game[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/games`, {
      method: 'GET',
      headers: {
        // Tambahkan Authorization jika diperlukan
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiGameResponse[] = await response.json();

    // Map response API ke interface Game
    return data.map((game: ApiGameResponse): Game => ({
      id: game.id,
      slug: game.slug,
      name: game.name,
      image: game.image,
      category: game.category,
      isPopular: game.isPopular,
      description: game.description,
      products: game.products.map((product: ApiProductResponse): Product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
      })),
    }));
  } catch (error) {
    console.error('[getPublicGames]', error);
    throw error;
  }
}

/* =====================
 * GET SINGLE GAME BY SLUG
 * ===================== */
export async function getPublicGameBySlug(slug: string): Promise<Game | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/games/${slug}`, {
      method: 'GET',
      headers: {
        // Tambahkan Authorization jika diperlukan
      },
    });

    if (response.status === 404) return null; // Laravel mengembalikan 404 jika tidak ditemukan
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiGameResponse = await response.json();

    // Map response API ke interface Game
    return {
      id: data.id,
      slug: data.slug,
      name: data.name,
      image: data.image,
      category: data.category,
      isPopular: data.isPopular,
      description: data.description,
      products: data.products.map((product: ApiProductResponse): Product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
      })),
    };
  } catch (error) {
    console.error('[getPublicGameBySlug]', error);
    throw error;
  }
}