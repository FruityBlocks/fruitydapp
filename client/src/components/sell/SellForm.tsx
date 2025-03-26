import { Box, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCurrencyEthereum, IconPencil } from "@tabler/icons-react";
import ButtonGroup from "../ButtonGroup";
import { validateFruitName, validatePrice } from "../../utils/formValidation";

const SellForm = () => {
  const form = useForm({
    initialValues: {
      fruitName: "",
      price: "",
    },
    validate: {
      fruitName: validateFruitName,
      price: validatePrice,
    },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      <Box w={350}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            mt={20}
            label={<Text size="lg">Fruit Name {<IconPencil size={16} />}</Text>}
            placeholder="Enter fruit name"
            {...form.getInputProps("fruitName")}
          />

          <TextInput
            mt={10}
            label={
              <Text size="lg">Price{<IconCurrencyEthereum size={16} />}</Text>
            }
            placeholder="Enter price"
            {...form.getInputProps("price")}
          />
          <ButtonGroup
            reset={() => form.reset()}
            rightLabel="Submit"
            leftLabel="Reset"
          />
        </form>
      </Box>
    </div>
  );
};

export default SellForm;
