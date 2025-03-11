/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        first: "rgba(var(--first))",
        fint: "rgba(var(--first-interactive))",
        second: "rgba(var(--second))",
        third: "rgba(var(--third))",
        tint: "rgba(var(--third-interactive))",
        accent: "rgba(var(--accent))",
        placeholder: "rgba(var(--placeholder))",
        overlay: "#00000080",

        ta: "rgba(var(--third-accent))",
        tf: "rgba(var(--third-first))",
        ts: "rgba(var(--third-second))",
        st: "rgba(var(--second-third))",
        fa: "rgba(var(--first-accent))",
        fai: "rgba(var(--first-accent-interactive))",
        as: "rgba(var(--accent-second))",

        fd: "rgba(var(--first-date))",
      },
      screens: {
        mobile: "20em",
        tablet: "48em",
        laptop: "64em",
      },
    },
  },
  plugins: [],
};
