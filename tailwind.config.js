/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // first, second, third and accent colors
        // light theme
        lf: "#497c8d",
        lfb: "#5c8999", //first-brighter (achieved with transparent white)
        ls: "#add8e6",
        lt: "#f0f0f0",
        ltd: "#e0e0e0", //third-darker
        la: "#0c0c0c",

        // dark theme
        df: "#0c0c0c",
        ds: "#333333",
        dt: "#464646",
        da: "#f0f0f0",

        // overlay color
        lo: "#00000080",

        //red for burrons
        lr: "#ff0000",
        dr: "#990000",

        // transparent white
        tw: "#FFFFFF1A",
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
