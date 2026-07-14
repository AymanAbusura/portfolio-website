/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx}", "./public/index.html"];
export const mode = "jit";
export const theme = {
  extend: {
    colors: {
      primary: "#F1F3F5",
      secondary: "#5B6472",
      tertiary: "#FFFFFF",
      "black-100": "#FFFFFF",
      "black-200": "#E7EAEE",
      "black-300": "#D8DCE3",
      "white-100": "#14171F",
      "white-500": "#5B6472",
      "custom-purple": "#2E5CFF",
      ink: "#14171F",
      paper: "#F1F3F5",
      line: "#D8DCE3",
      accent: "#2E5CFF",
      "accent-2": "#F5A524",
      p1: '#2E5CFF',
      p2: '#14171F',
      p3: '#F5A524',
      p4: '#14171F',
      p5: '#5B6472',
      s1: '#FFFFFF',
      s2: '#F1F3F5',
      s3: '#D8DCE3',
      s4: '#2E5CFF',
      s5: '#E7EAEE',
    },
    fontFamily: {
      sans: ["IBM Plex Sans", "Inter", "sans-serif"],
      display: ["Space Grotesk", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
    boxShadow: {
      card: "0px 10px 40px -12px rgba(20, 23, 31, 0.12)",
      glow: "0px 0px 0px 1px rgba(46, 92, 255, 0.25)",
    },
    backgroundImage: {
      "grid-glow":
        "linear-gradient(to right, rgba(20,23,31,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,23,31,0.05) 1px, transparent 1px)",
    },
    backgroundSize: {
      grid: "40px 40px",
    },
    screens: {
      xs: "450px",
    },
  },
};
export const plugins = [];