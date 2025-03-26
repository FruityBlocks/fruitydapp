import { Box, SimpleGrid } from "@mantine/core";
import tempData from "../../tempData";
import CardMyFruit from "./CardMyFruit";

const GridMyFruits = () => {
  return (
    <Box>
      <SimpleGrid mb={50} mt={20} cols={{ base: 2, sm: 3, lg: 5 }} spacing="lg">
        {tempData.map((item, index) => (
          <CardMyFruit key={index} item={item} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default GridMyFruits;
