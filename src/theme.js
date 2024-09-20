// src/theme.js
import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    mode: "dark", // Enable dark mode
    background: {
      default: "#1e1e1e", // Match Tailwind dark background
      paper: "#2a2a2a", // Match Tailwind dark card background
    },
    text: {
      primary: "#f5f5f5", // Subtle white text
    },
    primary: {
      main: "#bb86fc", // A subtle purple for primary elements
    },
    secondary: {
      main: "#03dac6", // A subtle teal for secondary elements
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    fontSize: 14, // Base font size
  },
})

export default theme
