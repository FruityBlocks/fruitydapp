import { Title } from "@mantine/core";
import CreateFruitForm from "../components/createFruit/CreateFruitForm";

const CreateFruit = () => {
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
      <CreateFruitForm />
    </div>
  );
};

export default CreateFruit;
