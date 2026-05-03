import { useStore } from "@nanostores/react";
import { cart, cartTotal, removeFromCart, changeQty } from "../stores/cart";
import { COLOR_MAP } from "../data/products";
import type { CartItem } from "../stores/cart";

const PATHS: Record<string, string> = {
  Totem: "M70 10 H130 V30 Q160 50 160 90 Q160 120 130 130 Q160 145 160 175 Q160 220 130 240 V270 H70 V240 Q40 220 40 175 Q40 145 70 130 Q40 120 40 90 Q40 50 70 30 Z",
  Amphora: "M85 10 H115 V30 H120 V50 H125 Q175 80 175 170 Q175 240 130 265 H70 Q25 240 25 170 Q25 80 75 50 H80 V30 H85 Z",
  Bottle: "M82 10 H118 V70 Q170 95 170 175 Q170 250 100 265 Q30 250 30 175 Q30 95 82 70 Z",
  Bowl: "M15 70 H185 Q180 170 100 175 Q20 170 15 70 Z",
  Cup: "M40 30 H160 V60 Q190 65 190 110 Q190 150 160 150 V170 Q160 190 140 190 H60 Q40 190 40 170 Z M160 80 V130 Q170 130 170 110 Q170 80 160 80 Z",
  Goblet: "M40 10 H160 V30 Q160 90 110 110 V190 Q140 200 145 230 Q150 260 175 270 H25 Q50 260 55 230 Q60 200 90 190 V110 Q40 90 40 30 Z",
  Jug: "M70 25 Q90 5 130 15 V45 Q170 65 170 160 Q170 250 100 270 Q30 250 30 160 Q30 80 70 55 Z",
  Plate: "",
};

function VaseThumb({ shape, color }: { shape: string; color: string }) {
  const fill = COLOR_MAP[color] || "#B5532A";
  const wide = ["Bowl", "Plate", "Cup"].includes(shape);

  if (shape === "Plate") {
    return (
      <svg viewBox="0 0 200 200" className="max-h-[78px]">
        <circle cx="100" cy="100" r="90" fill={fill} />
      </svg>
    );
  }

  return (
    <svg viewBox={wide ? "0 0 200 200" : "0 0 200 280"} className="max-h-[78px]">
      <path fill={fill} d={PATHS[shape] || PATHS.Bottle} />
    </svg>
  );
}

function fmt(n: number) {
  return `€${n.toFixed(0)}`;
}

export default function CartPage() {
  const items = useStore(cart);
  const total = useStore(cartTotal);

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-serif text-3xl font-normal mb-4">Your bag is empty.</p>
        <p className="text-sm opacity-65 mb-8">Pieces wait quietly on the shelf.</p>
        <a
          href="/shop"
          className="inline-block px-6 py-3 bg-[#1C1B17] text-[#F6F1E6] rounded-full text-sm uppercase tracking-[.06em] font-semibold hover:-translate-y-px transition-transform"
        >
          Browse the shop
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Items */}
      <div className="divide-y divide-[#1C1B17]/10">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-[96px_1fr] gap-6 py-6">
            <div className="aspect-square border border-[#1C1B17]/10 p-2 flex items-center justify-center bg-[#E9DEC9] rounded">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="max-h-[78px] object-contain" />
              ) : (
                <VaseThumb shape={item.shape} color={item.color} />
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-start">
                <h3 className="font-serif text-xl font-normal">{item.name}</h3>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-lg opacity-50 hover:opacity-100"
                >
                  ×
                </button>
              </div>
              <span className="font-mono text-[11px] tracking-[.08em] uppercase opacity-65">
                {item.category} · {item.edition}
              </span>
              <div className="flex justify-between items-center mt-2">
                <div className="inline-flex items-center border border-[#1C1B17] rounded-full p-0.5">
                  <button
                    onClick={() => changeQty(item.id, -1)}
                    className="w-[26px] h-[26px] text-sm rounded-full hover:bg-[#1C1B17]/5"
                  >
                    −
                  </button>
                  <span className="px-2.5 font-mono text-[13px] tabular-nums">{item.qty}</span>
                  <button
                    onClick={() => changeQty(item.id, +1)}
                    className="w-[26px] h-[26px] text-sm rounded-full hover:bg-[#1C1B17]/5"
                  >
                    +
                  </button>
                </div>
                <span className="font-mono text-sm font-medium tabular-nums">
                  {fmt(item.price * item.qty)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border-t border-[#1C1B17]/10 pt-6 mt-2 flex flex-col gap-3">
        <div className="flex justify-between items-baseline">
          <span className="text-sm">Subtotal</span>
          <span className="font-serif text-2xl font-normal">{fmt(total)}</span>
        </div>
        <div className="flex justify-between items-baseline text-sm opacity-65">
          <span>Shipping</span>
          <span>{total > 120 ? "Free" : "Calc. at checkout"}</span>
        </div>
        <a
          href="/checkout"
          className="mt-4 flex items-center justify-center gap-3 w-full py-4 rounded-full text-sm tracking-[.06em] uppercase font-semibold bg-[#1C1B17] text-[#F6F1E6] hover:-translate-y-px transition-transform"
        >
          Checkout — {fmt(total)}
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
