/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/theme/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hindSiliguri: ["var(--font-hindSiliguri)"],
        baiJamjuree: ["var(--font-baiJamjuree)", "var(--font-hindSiliguri)"],
      },
      colors: {
        primary: "#5B2EFF",
        primaryDark: "#3D1BB3",
        accent: "#FF8A00",
      },
    },
  },
  plugins: [],
};
