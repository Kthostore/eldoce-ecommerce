/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#182c3b",
        primaryButton: "#f26915",
        buttonHover: "#5a6b75",
        header: "#182c3b",
        price: "#182c3b",
        icons: "#f3f6ee"
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-background",
    "bg-header",
    "bg-primaryButton",
    "bg-buttonHover",
    "text-icons",
    "text-price"
  ]
}
