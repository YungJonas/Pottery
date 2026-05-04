import type { APIRoute } from "astro";
import Stripe from "stripe";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

interface IncomingItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  category?: string;
  edition?: string;
  imageUrl?: string;
}

export const POST: APIRoute = async ({ request }) => {
  const { items } = (await request.json()) as { items: IncomingItem[] };

  if (!Array.isArray(items) || items.length === 0) {
    return new Response(JSON.stringify({ error: "Cart is empty" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const line_items = items.map((item) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: item.name,
        ...(item.imageUrl ? { images: [item.imageUrl] } : {}),
        metadata: {
          ...(item.category ? { category: item.category } : {}),
          ...(item.edition ? { edition: item.edition } : {}),
          productId: item.id,
        },
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.qty,
  }));

  const origin = new URL(request.url).origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: `${origin}/success`,
    cancel_url: `${origin}/cart`,
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { "content-type": "application/json" },
  });
};
