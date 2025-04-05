import { Modal, Stack, Text, Title, Rating, Textarea } from "@mantine/core";
import { Fruit } from "../../models/Fruit";
import { IconCurrencyEthereum } from "@tabler/icons-react";
import ButtonGroup from "../ButtonGroup";
import { ModalType } from "../../utils/enums";
import { useForm } from "@mantine/form";
import { validateComment } from "../../utils/formValidation";

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
    if (form.errors.comment || form.errors.rating) return;
    console.log(values);
    close();
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <Title size="lg" c="fruity-orange">
        {type === ModalType.BUY ? (
          <>
            You are about to buy {fruit.name} for{" "}
            <IconCurrencyEthereum size={20} /> {fruit.price}
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

        <ButtonGroup
          submit={form.onSubmit(handleSubmit)}
          cancel={close}
          leftLabel="Cancel"
          rightLabel="Confirm"
        />
      </Stack>
    </Modal>
  );
};

export default ConfirmationModal;
