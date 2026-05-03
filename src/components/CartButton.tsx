import { useStore } from "@nanostores/react";
import { cartCount, openDrawer } from "../stores/cart";

export default function CartButton() {
  const count = useStore(cartCount);

  return (
    <button
      onClick={() => openDrawer()}
      className="inline-flex items-center gap-2 font-semibold tracking-[.08em] uppercase text-xs hover:-translate-y-px transition-transform"
    >
      <span>Bag</span>
      <span className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full bg-[#B5532A] text-[#F6F1E6] text-[11px] font-semibold tabular-nums">
        {count.toString().padStart(2, "0")}
      </span>
    </button>
  );
}
