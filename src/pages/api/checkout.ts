import type { APIRoute } from "astro";
import Stripe from "stripe";

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY);

export const POST: APIRoute = async ({ request }) => {
  const { items } = await request.json();

  if (!Array.isArray(items) || items.length === 0) {
    return new Response(JSON.stringify({ error: "Cart is empty" }), {
      status: 400,
    });
  }

  const line_items = items.map(
    (item: { title: string; price: number; qty: number }) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.title },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    })
  );

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    success_url: `${new URL(request.url).origin}/success`,
    cancel_url: `${new URL(request.url).origin}/cart`,
  });

  return new Response(JSON.stringify({ url: session.url }));
};
