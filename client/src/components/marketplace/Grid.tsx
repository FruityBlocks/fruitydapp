import { SimpleGrid } from "@mantine/core";
import tempData from "../../tempData";
import CardFruit from "./CardFruit";

const MarketPlaceGrid = () => {
  return (
    <SimpleGrid mb={50} mt={50} cols={{ base: 1, sm: 3, lg: 3 }} spacing="lg">
      {tempData.map((item, index) => (
        <CardFruit index={index} item={item} />
      ))}
    </SimpleGrid>
  );
};

export default MarketPlaceGrid;
