import { Title } from "@mantine/core";
import MarketPlaceGrid from "../components/marketplace/Grid";

const MarketPlace = () => {
  return (
    <div>
      <Title
        order={1}
        style={{
          textAlign: "center",
        }}
      >
        Welcome to the MarketPlace
      </Title>
      <MarketPlaceGrid />
    </div>
  );
};
export default MarketPlace;
