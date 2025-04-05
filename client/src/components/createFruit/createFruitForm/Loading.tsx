import { Center, Text } from "@mantine/core";
import { motion } from "framer-motion";

const Loading = ({ fruitCreated }: { fruitCreated: string }) => (
  <motion.div
    key="loading"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
  >
    <Center mt={40} style={{ flexDirection: "column" }}>
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ fontSize: "3rem" }}
      >
        🍉
      </motion.div>
      <Text mt={15} size="lg">
        Creating {fruitCreated}...
      </Text>
    </Center>
  </motion.div>
);

export default Loading;
