import { useEffect, useState } from "react";
import { cart } from "../stores/cart";

export default function CheckoutRedirect() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const items = cart.get();
    if (items.length === 0) {
      window.location.href = "/cart";
      return;
    }

    const payload = items.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      qty: i.qty,
      category: i.category,
      edition: i.edition,
      imageUrl: i.imageUrl,
    }));

    fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ items: payload }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || !data.url) {
          throw new Error(data.error || "Could not start checkout");
        }
        window.location.href = data.url;
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
      });
  }, []);

  if (error) {
    return (
      <div className="text-center">
        <p className="font-serif text-2xl mb-4">Checkout couldn't start.</p>
        <p className="opacity-70 mb-8 text-sm">{error}</p>
        <a
          href="/cart"
          className="inline-block px-6 py-3 bg-ink text-paper rounded-full text-xs uppercase tracking-[.06em] font-semibold hover:-translate-y-px transition-transform"
        >
          Back to bag
        </a>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="font-mono text-[11px] tracking-[.12em] uppercase opacity-65 mb-3">
        One moment
      </p>
      <p className="font-serif text-3xl">Redirecting to secure checkout…</p>
      <div className="mt-8 inline-flex items-center gap-2 font-mono text-xs tracking-[.08em] uppercase opacity-50">
        <span className="w-1.5 h-1.5 rounded-full bg-ink animate-pulse"></span>
        <span>Stripe</span>
      </div>
    </div>
  );
}
