import { generateColors } from "@mantine/colors-generator";
import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Gill Sans",
  fontFamilyMonospace: "Gill Sans",
  headings: {
    fontFamily: "Gill Sans",
  },
  primaryColor: "fruity-orange",
  colors: {
    "fruity-orange": generateColors("#ed7924"),
    "fruity-black": generateColors("#161515"),
  },
});
