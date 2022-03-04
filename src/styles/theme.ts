import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      400: "#D3C8FF",
      500: "#C299FF",
      600: "#B685FF",
      700: "#A970FF",
      800: "#9D5CFF",
      900: "#6200F5",
    },
    secondary: {
      400: "#ADAFB8",
      500: "#858794",
      600: "#33374D",
      700: "#1F2A3D",
      800: "#0E1724",
    },
  },
});

export default theme;
