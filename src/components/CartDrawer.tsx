import { useStore } from "@nanostores/react";
import {
  cart,
  drawerOpen,
  cartCount,
  cartTotal,
  closeDrawer,
  removeFromCart,
  changeQty,
} from "../stores/cart";
import { COLOR_MAP } from "../data/products";
import type { CartItem } from "../stores/cart";

// Inline SVG vase paths (subset needed for cart thumbnails)
const PATHS: Record<string, string> = {
  Totem: "M70 10 H130 V30 Q160 50 160 90 Q160 120 130 130 Q160 145 160 175 Q160 220 130 240 V270 H70 V240 Q40 220 40 175 Q40 145 70 130 Q40 120 40 90 Q40 50 70 30 Z",
  Amphora: "M85 10 H115 V30 H120 V50 H125 Q175 80 175 170 Q175 240 130 265 H70 Q25 240 25 170 Q25 80 75 50 H80 V30 H85 Z",
  Bottle: "M82 10 H118 V70 Q170 95 170 175 Q170 250 100 265 Q30 250 30 175 Q30 95 82 70 Z",
  Donut: "M90 15 H110 V40 Q175 60 175 160 Q175 260 100 270 Q25 260 25 160 Q25 60 90 40 Z M100 105 Q60 105 60 165 Q60 220 100 220 Q140 220 140 165 Q140 105 100 105 Z",
  Handle: "M75 10 H125 Q140 10 140 30 V50 Q175 60 185 110 Q185 130 165 130 Q175 160 175 200 Q175 250 130 270 H70 Q25 250 25 200 Q25 160 35 130 Q15 130 15 110 Q25 60 60 50 V30 Q60 10 75 10 Z M50 80 Q35 90 35 105 Q40 110 50 105 Q60 95 60 80 Z M150 80 Q165 90 165 105 Q160 110 150 105 Q140 95 140 80 Z",
  Wavy: "M75 10 H125 V40 Q165 50 165 75 Q165 100 125 110 Q165 120 165 145 Q165 170 125 180 Q165 190 165 215 Q165 250 125 265 H75 Q35 250 35 215 Q35 190 75 180 Q35 170 35 145 Q35 120 75 110 Q35 100 35 75 Q35 50 75 40 Z",
  Goblet: "M40 10 H160 V30 Q160 90 110 110 V190 Q140 200 145 230 Q150 260 175 270 H25 Q50 260 55 230 Q60 200 90 190 V110 Q40 90 40 30 Z",
  Bowl: "M15 70 H185 Q180 170 100 175 Q20 170 15 70 Z",
  Cup: "M40 30 H160 V60 Q190 65 190 110 Q190 150 160 150 V170 Q160 190 140 190 H60 Q40 190 40 170 Z M160 80 V130 Q170 130 170 110 Q170 80 160 80 Z",
  Jug: "M70 25 Q90 5 130 15 V45 Q170 65 170 160 Q170 250 100 270 Q30 250 30 160 Q30 80 70 55 Z",
  Plate: "",
};

function VaseSVG({ shape, color }: { shape: string; color: string }) {
  const fill = COLOR_MAP[color] || "#B5532A";
  const wide = ["Bowl", "Plate", "Cup"].includes(shape);
  const viewBox = wide ? "0 0 200 200" : "0 0 200 280";

  if (shape === "Plate") {
    return (
      <svg viewBox="0 0 200 200" style={{ width: "100%", height: "auto", maxHeight: 78 }}>
        <circle cx="100" cy="100" r="90" fill={fill} />
        <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg viewBox={viewBox} style={{ width: "auto", height: "auto", maxHeight: 78 }}>
      <path
        fill={fill}
        fillRule={shape === "Donut" ? "evenodd" : undefined}
        d={PATHS[shape] || PATHS.Bottle}
      />
    </svg>
  );
}

function fmt(n: number) {
  return `€${n.toFixed(0)}`;
}

export default function CartDrawer() {
  const items = useStore(cart);
  const open = useStore(drawerOpen);
  const count = useStore(cartCount);
  const total = useStore(cartTotal);

  return (
    <>
      {/* Scrim */}
      <div
        onClick={() => closeDrawer()}
        className="fixed inset-0 z-[90] transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,.45)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      />

      {/* Drawer */}
      <aside
        className="fixed top-0 right-0 bottom-0 z-[100] flex flex-col border-l border-[#1C1B17]"
        style={{
          width: "min(460px, 100%)",
          background: "#F6F1E6",
          color: "#1C1B17",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 350ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-[#1C1B17]/20">
          <div>
            <span className="font-mono text-xs tracking-[.1em] uppercase opacity-65 block mb-2">
              Your Bag
            </span>
            <h3 className="font-serif text-[32px] font-normal">
              {count} {count === 1 ? "piece" : "pieces"}
            </h3>
          </div>
          <button
            onClick={() => closeDrawer()}
            className="w-9 h-9 text-2xl leading-none border border-current rounded-full flex items-center justify-center hover:bg-[#1C1B17]/5"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-auto px-6 py-2">
          {items.length === 0 && (
            <div className="flex flex-col items-center gap-3.5 text-center pt-12">
              <div style={{ opacity: 0.6 }}>
                <VaseSVG shape="Bowl" color="sand" />
              </div>
              <p className="font-serif text-2xl font-normal">Bag's empty.</p>
              <p className="font-sans text-sm opacity-65 tracking-wide">
                Pieces wait quietly on the shelf.
              </p>
            </div>
          )}

          {items.map((item) => (
            <DrawerItem key={item.id} item={item} />
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-[#1C1B17]/20 p-6 flex flex-col gap-3">
          <div className="flex justify-between items-baseline">
            <span className="text-sm">Subtotal</span>
            <span className="font-serif text-xl font-normal">{fmt(total)}</span>
          </div>
          <div className="flex justify-between items-baseline text-sm opacity-65">
            <span>Shipping</span>
            <span>{total > 120 ? "Free" : "Calc. at checkout"}</span>
          </div>
          <a
            href={items.length ? "/checkout" : undefined}
            onClick={(e) => {
              if (!items.length) e.preventDefault();
            }}
            className="mt-2 flex items-center justify-center gap-3 w-full py-4 rounded-full text-sm tracking-[.06em] uppercase font-semibold transition-transform hover:-translate-y-px"
            style={{
              background: items.length ? "#1C1B17" : "rgba(0,0,0,.12)",
              color: "#F6F1E6",
              cursor: items.length ? "pointer" : "not-allowed",
            }}
          >
            Checkout — {fmt(total)}
            <span aria-hidden>→</span>
          </a>
        </div>
      </aside>
    </>
  );
}

function DrawerItem({ item }: { item: CartItem }) {
  return (
    <div className="grid grid-cols-[96px_1fr] gap-4 py-[18px] border-b border-[#1C1B17]/20">
      {/* Thumbnail */}
      <div className="aspect-square border border-[#1C1B17]/20 p-2 flex items-center justify-center bg-[#E9DEC9]">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="max-h-[78px] object-contain" />
        ) : (
          <VaseSVG shape={item.shape} color={item.color} />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-1.5 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h4 className="font-serif text-lg font-normal">{item.name}</h4>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-lg leading-none opacity-50 hover:opacity-100"
            aria-label="Remove"
          >
            ×
          </button>
        </div>
        <span className="font-mono text-[11px] tracking-[.08em] uppercase opacity-65">
          {item.category} · {item.edition}
        </span>
        <div className="flex justify-between items-center mt-1.5">
          {/* Qty stepper */}
          <div className="inline-flex items-center border border-[#1C1B17] rounded-full p-0.5">
            <button
              onClick={() => changeQty(item.id, -1)}
              className="w-[26px] h-[26px] text-sm leading-none rounded-full hover:bg-[#1C1B17]/5"
            >
              −
            </button>
            <span className="px-2.5 font-mono text-[13px] tabular-nums">
              {item.qty}
            </span>
            <button
              onClick={() => changeQty(item.id, +1)}
              className="w-[26px] h-[26px] text-sm leading-none rounded-full hover:bg-[#1C1B17]/5"
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
  );
}
