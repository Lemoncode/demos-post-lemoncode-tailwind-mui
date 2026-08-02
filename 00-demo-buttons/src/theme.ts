import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#6d28d9" },
        secondary: { main: "#0d9488" },
        background: { default: "#f8fafc" },
      },
    },
    dark: {
      palette: {
        primary: { main: "#a78bfa" },
        secondary: { main: "#2dd4bf" },
        background: { default: "#0f172a", paper: "#1e293b" },
      },
    },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: "'Roboto Variable', system-ui, sans-serif",
  },
});
