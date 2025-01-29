export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        glow: {
          "0%, 100%": { textShadow: "0 0 8px rgba(255, 255, 255, 0.8)" },
          "50%": { textShadow: "0 0 12px rgba(255, 255, 255, 1)" },
        },
      },
      animation: {
        glow: "glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
