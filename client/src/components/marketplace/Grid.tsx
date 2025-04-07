import { SimpleGrid, Text } from "@mantine/core";
import CardFruit from "./CardFruit";
import useGetFruitsForSale from "../../hooks/useGetFruitsForSale";
import Spinner from "../Spinner";

const MarketPlaceGrid = () => {
  const { fruits, loading, reload } = useGetFruitsForSale();

  if (loading) return <Spinner />;
  return (
    <SimpleGrid mb={50} mt={50} cols={{ base: 1, sm: 3, lg: 3 }} spacing="lg">
      {fruits.length > 0 ? (
        fruits.map((item, index) => (
          <CardFruit key={index} fruit={item} reloadMarketPlace={reload} />
        ))
      ) : (
        <Text size="xl">No Fruits For Sale</Text>
      )}
    </SimpleGrid>
  );
};

export default MarketPlaceGrid;
