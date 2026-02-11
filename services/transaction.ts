// File: services/transaction.ts
import { Transaction } from '@/data/transactions';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

interface CreateTransactionPayload {
  invoiceNumber: string;
  customerId: string;
  customerPhone?: string;
  gameId: string;
  nominalId: string;
  basePrice: number;
  sellingPrice: number;
  adminFee?: number;
  serverId?: string;
}

export async function createTransaction(
  payload: CreateTransactionPayload
) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found. Please login.');
  }

  const totalAmount = payload.sellingPrice + (payload.adminFee ?? 0);

  try {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        invoice_number: payload.invoiceNumber,
        customer_id: payload.customerId,
        customer_phone: payload.customerPhone ?? null,
        game_id: payload.gameId,
        nominal_id: payload.nominalId,
        base_price: payload.basePrice,
        selling_price: payload.sellingPrice,
        admin_fee: payload.adminFee ?? 0,
        total_amount: totalAmount,
        status: 'pending',
        server_id: payload.serverId ?? null,
      }),
    });

    if (response.status === 302) {
      // Handle redirect sebagai error autentikasi
      throw new Error('Authentication failed. Please login again.');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[createTransaction]', error);
    throw error;
  }
}

export async function getTransactionByInvoice(
  invoiceId: string
): Promise<Transaction | null> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found. Please login.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${invoiceId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 302) {
      throw new Error('Authentication failed. Please login again.');
    }

    if (response.status === 404) return null;
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      invoiceId: data.invoice_number,
      gameName: data.game_name ?? '-',
      productName: data.nominal_name ?? '-',
      userId: data.customer_id,
      serverId: data.server_id ?? undefined,
      amount: data.total_amount,
      status: normalizeStatus(data.status),
      paymentMethod: data.payment_method ?? '',
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('[getTransactionByInvoice]', error);
    throw error;
  }
}

function normalizeStatus(
  status: string
): Transaction['status'] {
  if (status === 'pending' || status === 'payment_pending') return 'pending';
  if (status === 'processing' || status === 'sent_to_provider') return 'processing';
  if (status === 'success') return 'success';
  return 'failed';
}

export async function getRecentTransactions(
  limit = 15
): Promise<Transaction[]> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found. Please login.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/transactions/recent?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 302) {
      throw new Error('Authentication failed. Please login again.');
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const txs: ApiTransactionResponse[] = await response.json();

    return txs.map((tx: ApiTransactionResponse) => ({
      id: tx.id,
      invoiceId: tx.invoice_number,
      gameName: tx.game_name ?? '-',
      productName: tx.nominal_name ?? '-',
      userId: tx.customer_id,
      serverId: tx.server_id ?? undefined,
      amount: tx.total_amount,
      status: normalizeStatus(tx.status),
      paymentMethod: tx.payment_method ?? '',
      createdAt: tx.created_at,
      updatedAt: tx.updated_at,
    }));
  } catch (error) {
    console.error('[getRecentTransactions]', error);
    throw error;
  }
}
export async function processTransaction(transactionId: string) {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found. Please login.');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${transactionId}/process`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[processTransaction]', error);
    throw error;
  }
}

// Interface untuk response API (untuk type safety)
interface ApiTransactionResponse {
  id: string;
  invoice_number: string;
  customer_id: string;
  server_id: string | null;
  total_amount: number;
  status: string;
  payment_method: string | null;
  created_at: string;
  updated_at: string;
  game_name: string;
  nominal_name: string;
}