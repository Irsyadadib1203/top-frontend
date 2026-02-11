export interface Transaction {
  id: string;
  invoiceId: string;
  gameName: string;
  productName: string;
  userId: string;
  serverId?: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export const dummyTransactions: Transaction[] = [
  {
    id: '1',
    invoiceId: 'IRX-20260108-001',
    gameName: 'Mobile Legends',
    productName: '514 Diamonds',
    userId: '123456789',
    serverId: '1234',
    amount: 114000,
    status: 'success',
    paymentMethod: 'QRIS',
    createdAt: '2026-01-08T10:30:00Z',
    updatedAt: '2026-01-08T10:31:00Z',
  },
  {
    id: '2',
    invoiceId: 'IRX-20260108-002',
    gameName: 'Free Fire',
    productName: '720 Diamonds',
    userId: '987654321',
    amount: 100000,
    status: 'processing',
    paymentMethod: 'Dana',
    createdAt: '2026-01-08T11:00:00Z',
    updatedAt: '2026-01-08T11:00:00Z',
  },
  {
    id: '3',
    invoiceId: 'IRX-20260107-003',
    gameName: 'Genshin Impact',
    productName: '980 Genesis Crystals',
    userId: '456789123',
    amount: 249000,
    status: 'success',
    paymentMethod: 'GoPay',
    createdAt: '2026-01-07T15:45:00Z',
    updatedAt: '2026-01-07T15:46:00Z',
  },
  {
    id: '4',
    invoiceId: 'IRX-20260107-004',
    gameName: 'PUBG Mobile',
    productName: '660 UC',
    userId: '111222333',
    amount: 150000,
    status: 'failed',
    paymentMethod: 'OVO',
    createdAt: '2026-01-07T09:20:00Z',
    updatedAt: '2026-01-07T09:25:00Z',
  },
  {
    id: '5',
    invoiceId: 'IRX-20260106-005',
    gameName: 'Valorant',
    productName: '2400 VP',
    userId: '444555666',
    amount: 250000,
    status: 'pending',
    paymentMethod: 'Bank Transfer',
    createdAt: '2026-01-06T20:00:00Z',
    updatedAt: '2026-01-06T20:00:00Z',
  },
];

export const getTransactionByInvoice = (invoiceId: string): Transaction | undefined => {
  return dummyTransactions.find(
    (t) => t.invoiceId.toLowerCase() === invoiceId.toLowerCase()
  );
};
