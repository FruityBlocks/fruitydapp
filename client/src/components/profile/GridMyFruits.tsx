import { Box, Loader, SimpleGrid } from "@mantine/core";
import useGetUserFruits from "../../hooks/useGetUserFruits";
import CardMyFruit from "./CardMyFruit";

const GridMyFruits = () => {
  const { fruits, loading } = useGetUserFruits();

  if (loading) return <Loader />;

  return (
    <Box>
      <SimpleGrid mb={50} mt={20} cols={{ base: 2, sm: 3, lg: 5 }} spacing="lg">
        {fruits.map((item, index) => (
          <CardMyFruit key={index} item={item} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default GridMyFruits;
