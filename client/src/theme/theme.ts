import { generateColors } from "@mantine/colors-generator";
import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "fruity-orange",
  colors: {
    "fruity-orange": generateColors("#ed7924"),
    "fruity-black": generateColors("#161515"),
  },
});
