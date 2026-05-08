import { useState } from "react";
import { addToCart } from "../stores/cart";

interface Props {
  productId: string;
  productName: string;
  price: number;
  shape: string;
  color: string;
  category: string;
  edition: string;
  imageUrl?: string;
  className?: string;
}

export default function AddToCartButton(props: Props) {
  const [added, setAdded] = useState(false);

  function handleClick() {
    addToCart({
      id: props.productId,
      name: props.productName,
      price: props.price,
      shape: props.shape,
      color: props.color,
      category: props.category,
      edition: props.edition,
      imageUrl: props.imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  }

  return (
    <button
      onClick={handleClick}
      className={`px-3.5 py-2.5 rounded-full text-xs tracking-[.06em] uppercase font-semibold hover:-translate-y-px transition-all${props.className ? ` ${props.className}` : ""}`}
      style={{
        background: added ? "#5C6233" : "#1C1B17",
        color: "#F6F1E6",
      }}
    >
      {added ? "✓ Added" : `Add — €${props.price}`}
    </button>
  );
}
