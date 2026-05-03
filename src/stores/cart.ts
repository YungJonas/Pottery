import { atom, computed } from "nanostores";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  shape: string;
  color: string;
  category: string;
  edition: string;
  imageUrl?: string;
  qty: number;
}

const STORAGE_KEY = "pottery_cart_v1";

function load(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const cart = atom<CartItem[]>(load());
export const drawerOpen = atom(false);

export const cartCount = computed(cart, (items) =>
  items.reduce((sum, i) => sum + i.qty, 0)
);

export const cartTotal = computed(cart, (items) =>
  items.reduce((sum, i) => sum + i.price * i.qty, 0)
);

export function addToCart(product: Omit<CartItem, "qty">) {
  const items = [...cart.get()];
  const existing = items.find((i) => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    items.push({ ...product, qty: 1 });
  }
  cart.set(items);
  save(items);
  openDrawer();
}

export function removeFromCart(id: string) {
  const items = cart.get().filter((i) => i.id !== id);
  cart.set(items);
  save(items);
}

export function changeQty(id: string, delta: number) {
  const items = cart
    .get()
    .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
    .filter((i) => i.qty > 0);
  cart.set(items);
  save(items);
}

export function clearCart() {
  cart.set([]);
  save([]);
}

export function openDrawer() {
  drawerOpen.set(true);
}

export function closeDrawer() {
  drawerOpen.set(false);
}
