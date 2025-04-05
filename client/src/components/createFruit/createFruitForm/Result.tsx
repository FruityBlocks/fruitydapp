import { Box, Button, Center, Text, ThemeIcon } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { CreatingFruitFormState } from "../../../utils/enums";

const Result = ({
  message,
  uiState,
  onReset,
}: {
  message: string;
  uiState: CreatingFruitFormState.SUCCESS | CreatingFruitFormState.ERROR;
  onReset: () => void;
}) => (
  <motion.div
    key="result"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Center mt={30} style={{ flexDirection: "column" }}>
      <ThemeIcon
        color={uiState === CreatingFruitFormState.SUCCESS ? "green" : "red"}
        size="xl"
        radius="xl"
      >
        {uiState === CreatingFruitFormState.SUCCESS ? <IconCheck /> : <IconX />}
      </ThemeIcon>
      <Text mt={10} size="md">
        {message}
      </Text>
      <Box mt={20}>
        <Button onClick={onReset}>Back to form</Button>
      </Box>
    </Center>
  </motion.div>
);

export default Result;
