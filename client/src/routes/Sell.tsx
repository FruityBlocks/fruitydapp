import { Title } from "@mantine/core";
import SellForm from "../components/sell/SellForm";

const Sell = () => {
  return (
    <div>
      <Title
        order={1}
        style={{
          textAlign: "center",
        }}
      >
        Add your item to the MarketPlace
      </Title>
      <SellForm />
    </div>
  );
};

export default Sell;
