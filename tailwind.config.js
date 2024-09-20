// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class", // Enable dark mode
  theme: {
    extend: {
      colors: {
        darkbg: "#1e1e1e", // Dark background color
        darkcard: "#2a2a2a", // Dark card background color
        subtleWhite: "#f5f5f5", // Subtle white for text
      },
      fontSize: {
        sm: "0.875rem", // Small font size
        base: "1rem", // Base font size
        md: "1.125rem", // Medium font size
      },
    },
  },
  plugins: [],
}
