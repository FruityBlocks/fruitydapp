import { Loader, SimpleGrid } from "@mantine/core";
import CardFruit from "./CardFruit";
import useGetFruits from "../../hooks/useGetFruits";

const MarketPlaceGrid = () => {
  const { fruits, loading } = useGetFruits();

  if (loading) return <Loader />;

  return (
    <SimpleGrid mb={50} mt={50} cols={{ base: 1, sm: 3, lg: 3 }} spacing="lg">
      {fruits.map((item, index) => (
        <CardFruit key={index} fruit={item} />
      ))}
    </SimpleGrid>
  );
};

export default MarketPlaceGrid;
