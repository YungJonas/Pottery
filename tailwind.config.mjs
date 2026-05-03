/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bone: "#EFE7DA",
        ink: "#1C1B17",
        paper: "#F6F1E6",
        terra: "#B5532A",
        navy: "#22364A",
        olive: "#5C6233",
        sage: "#8FA17A",
        sand: "#A8916C",
        cream: "#E9DEC9",
        charcoal: "#2A2925",
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
