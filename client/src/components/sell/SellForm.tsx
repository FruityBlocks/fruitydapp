import { Box, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCurrencyEthereum, IconPencil } from "@tabler/icons-react";
import ButtonGroup from "../ButtonGroup";
import { validateFruitName, validatePrice } from "../../utils/formValidation";
import useWeb3 from "../../hooks/useWeb3";
import { ethers } from "ethers";
import { useState } from "react";

interface FormFruits {
  fruitName: string;
  price: string;
}

const SellForm = () => {
  const { contract, account } = useWeb3();
  const [successMessage, setSuccessMessage] = useState<string>("");
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

  const handleFormSubmit = async (values: FormFruits) => {
    if (!contract || !account) {
      setSuccessMessage("Wallet not connected or contract unavailable.");
      return;
    }

    try {
      const priceInWei = ethers.parseUnits(values.price, "ether");

      const tx = await contract.addFruit(
        values.fruitName,
        "Fruit",
        priceInWei,
        account,
        "Lemonish"
      );

      await tx.wait();

      setSuccessMessage(
        `✅ ${values.fruitName} has been added to the marketplace!`
      );
      form.reset();
    } catch (error) {
      console.error("Error adding fruit:", error);
      setSuccessMessage("❌ Failed to add fruit. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    >
      <Box w={350}>
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
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
            reset={() => {
              form.reset();
              setSuccessMessage("");
            }}
            rightLabel="Submit"
            leftLabel="Reset"
          />
        </form>

        {successMessage && (
          <Text
            mt={10}
            size="md"
            style={{ color: successMessage.includes("✅") ? "green" : "red" }}
          >
            {successMessage}
          </Text>
        )}
      </Box>
    </div>
  );
};

export default SellForm;
