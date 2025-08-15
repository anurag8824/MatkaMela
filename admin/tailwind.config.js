/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-51%)" },
        },
        gradientresult: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        "scroll-gallery": "scroll 30s linear infinite",
        gradientresult: 'gradientresult 15s ease infinite',

      },
      backgroundImage: {
        'main': 'linear-gradient(to right, #F15A24, #F59018, #FEF903)',
      }
    },
  },
  plugins: [],
};
