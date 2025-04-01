import { Box, SimpleGrid } from "@mantine/core";

const GridMyFruits = () => {
  return (
    <Box>
      <SimpleGrid mb={50} mt={20} cols={{ base: 2, sm: 3, lg: 5 }} spacing="lg">
      </SimpleGrid>
    </Box>
  );
};

export default GridMyFruits;
