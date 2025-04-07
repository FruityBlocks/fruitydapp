import { Box, SimpleGrid, Text } from "@mantine/core";
import useGetUserFruits from "../../hooks/useGetUserFruits";
import CardMyFruit from "./CardMyFruit";
import Spinner from "../Spinner";

const GridMyFruits = () => {
  const { fruits, loading, reload } = useGetUserFruits();

  if (loading) return <Spinner />;
  return (
    <Box>
      <SimpleGrid mb={50} mt={20} cols={{ base: 2, sm: 2, lg: 4 }} spacing="lg">
        {fruits.length > 0 ? (
          fruits.map((item, index) => (
            <CardMyFruit key={index} item={item} reloadFruits={reload} />
          ))
        ) : (
          <Text c="red" size="xl">
            No Fruits yet.
          </Text>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default GridMyFruits;
