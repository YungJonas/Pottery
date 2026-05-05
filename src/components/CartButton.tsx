import { useStore } from "@nanostores/react";
import { cartCount, openDrawer } from "../stores/cart";

export default function CartButton() {
  const count = useStore(cartCount);

  return (
    <button
      onClick={() => openDrawer()}
      className="relative inline-flex items-center hover:-translate-y-px transition-transform"
      aria-label="Open cart"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#B5532A] text-[#F6F1E6] text-[9px] font-semibold tabular-nums leading-none">
          {count}
        </span>
      )}
    </button>
  );
}
