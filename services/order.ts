// services/order.ts
import { supabase } from "@/lib/supabase";

export async function createOrder(payload: {
  invoiceId: string;
  gameId: string;
  nominalId: string;
  userId?: string;
  amount: number;
}) {
  const { data, error } = await supabase
    .from("orders")
    .insert({
      invoice_id: payload.invoiceId,
      game_id: payload.gameId,
      nominal_id: payload.nominalId,
      user_id: payload.userId ?? null,
      amount: payload.amount,
      status: "PENDING",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
