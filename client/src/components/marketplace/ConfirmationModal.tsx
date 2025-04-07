import {
  Modal,
  Stack,
  Text,
  Title,
  Rating,
  Textarea,
  NumberInput,
} from "@mantine/core";
import { Fruit } from "../../models/Fruit";
import { IconCurrencyEthereum } from "@tabler/icons-react";
import ButtonGroup from "../ButtonGroup";
import { ModalType } from "../../utils/enums";
import { useForm } from "@mantine/form";
import { validateComment } from "../../utils/formValidation";
import { useState } from "react";

interface ConfirmationModalProps {
  opened: boolean;
  close: () => void;
  type: ModalType;
  fruit: Fruit;
}

interface FormValuesRate {
  comment: string;
  rating: number;
}

const ConfirmationModal = ({
  opened,
  close,
  fruit,
  type,
}: ConfirmationModalProps) => {
  const [newPrice, setNewPrice] = useState<number>(fruit.price);
  const form = useForm({
    initialValues: {
      comment: "",
      rating: 0,
    },
    validate: {
      comment: validateComment,
      rating: (value: number) => (value === 0 ? "Rating cannot be 0" : null),
    },
  });

  const handleSubmit = (values: FormValuesRate) => {
    if (type === ModalType.RATE) {
      if (form.errors.comment || form.errors.rating) return;
      console.log("Rating submitted", values);
    }
    if (type === ModalType.SELL) {
      console.log(newPrice);
      console.log("Fruit listed for sale:", fruit.name);
    }
    close();
  };

  const handleConfirmClick = () => {
    if (type === ModalType.RATE) {
      form.onSubmit(handleSubmit)();
    } else if (type === ModalType.SELL) {
      console.log(newPrice);
      console.log("Fruit listed for sale:", fruit.name);
      close();
    } else {
      close();
    }
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <Title size="lg" c="fruity-orange">
        {type === ModalType.BUY || type == ModalType.SELL ? (
          <>
            You are about to {type == ModalType.SELL ? "Sell" : "Buy"}{" "}
            {fruit.name} for <IconCurrencyEthereum size={20} /> {fruit.price}
          </>
        ) : (
          "Rate the buyer"
        )}
      </Title>

      <Stack mt="lg">
        <Text size="md">
          Seller: {fruit.owner.slice(0, 6)}...{fruit.owner.slice(-4)}
        </Text>

        {type === ModalType.RATE && (
          <>
            <Rating
              size="lg"
              value={form.values.rating}
              onChange={(rating) => form.setFieldValue("rating", rating)}
            />
            {form.errors.rating && (
              <Text c="red" size="sm">
                {form.errors.rating}
              </Text>
            )}
            <Textarea
              placeholder="Write a comment..."
              autosize
              minRows={3}
              {...form.getInputProps("comment")}
            />
          </>
        )}

        {type === ModalType.SELL && (
          <>
            <NumberInput
              label="New Price"
              placeholder="Price"
              min={0.1}
              max={1000}
              decimalScale={1}
              defaultValue={fruit.price}
              leftSection={<IconCurrencyEthereum />}
              onChange={(value) => setNewPrice(Number(value))}
            />
          </>
        )}

        <ButtonGroup
          submit={() => handleConfirmClick()}
          cancel={close}
          leftLabel="Cancel"
          rightLabel="Confirm"
        />
      </Stack>
    </Modal>
  );
};

export default ConfirmationModal;
