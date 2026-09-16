"use server";

import { deductStock } from "@/lib/redis";

export interface OrderItem {
  productId: string;
  productName: string;
  weightGrams: number;
}

export async function processCheckout(
  customerName: string, 
  phone: string, 
  location: string,
  items: OrderItem[],
  subtotal: number,
  deliveryFee: number
) {
  try {
    // 1. Deduct Stock in Upstash Redis
    for (const item of items) {
      const remainingStock = await deductStock(item.productId, item.weightGrams);

      if (remainingStock === -1) {
        return {
          success: false,
          error: `Insufficient stock for ${item.productName}.`,
        };
      }
    }

    // 2. Format Order Details
    const grandTotal = subtotal + deliveryFee;
    const deliveryText = deliveryFee === 0 ? "FREE" : `${deliveryFee} ETB`;

    const itemDetails = items
      .map(
        (item) =>
          `• ${item.productName} (${
            item.weightGrams >= 1000
              ? `${item.weightGrams / 1000} kg`
              : `${item.weightGrams} g`
          })`
      )
      .join("\n");

    // 3. Compose Telegram Alert with Customer Location
    const message = 
      `🛍️ *New Order - Tena Organics*\n\n` +
      `👤 *Customer*: ${customerName}\n` +
      `📞 *Phone*: ${phone}\n` +
      `📍 *Location*: ${location}\n\n` +
      `📦 *Items*:\n${itemDetails}\n\n` +
      `💵 *Subtotal*: ${subtotal} ETB\n` +
      `🚚 *Delivery*: ${deliveryText}\n` +
      `💰 *Grand Total*: *${grandTotal} ETB*`;

    // 4. Validate Environment Variables
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("Telegram environment variables are missing.");
    }

    // 5. Send Notification to Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send order notification to Telegram.");
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Checkout failed" };
  }
}