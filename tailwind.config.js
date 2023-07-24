/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "960px",
      xl: "1440px",
    },
    extend: {
      colors: {
        t: {
          bg_start: "var(--bg_start)",
          bg_end: "var(--bg_end)",
          c_blue: "var(--c_blue)",
          g_blue: "var(--g_blue)",
          dg_blue: "var(--dg_blue)",
          vg_blue: "var(--vg_blue)",
          hover_blue: "var(--hover_blue)",
          dark_light: "var(--dark_light)",
        },
      },
      backgroundImage: {
        "bg-mob-d": "url('/images/bg-mobile-dark.jpg')",
        "bg-mob-l": "url('/images/bg-mobile-light.jpg')",
        "bg-dsk-d": "url('/images/bg-desktop-dark.jpg')",
        "bg-dsk-l": "url('/images/bg-desktop-light.jpg')",
      },
    },
  },
  plugins: [],
};
