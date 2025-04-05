import { Box, SimpleGrid } from "@mantine/core";
import useGetUserFruits from "../../hooks/useGetUserFruits";
import CardMyFruit from "./CardMyFruit";
import Spinner from "../Spinner";

const GridMyFruits = () => {
  const { fruits, loading } = useGetUserFruits();

  if (loading) return <Spinner />;

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
