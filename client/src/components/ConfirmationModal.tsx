import {
  Modal,
  Stack,
  Text,
  Title,
  Rating,
  Textarea,
  NumberInput,
  LoadingOverlay,
} from "@mantine/core";
import { Fruit } from "../models/Fruit";
import { IconCurrencyEthereum } from "@tabler/icons-react";
import ButtonGroup from "./ButtonGroup";
import { ModalType } from "../utils/enums";
import { useForm } from "@mantine/form";
import { validateComment } from "../utils/formValidation";
import { useState } from "react";
import { contractActions } from "../api/api";
import useWeb3 from "../hooks/useWeb3";
import { handleError } from "../models/Errors";
import {
  DEFAULT_NOTI_MESSAGE_TRANSACTION_FAIL,
  DEFAULT_NOTI_TITLE,
} from "../utils/constants";

interface ConfirmationModalProps {
  opened: boolean;
  close: () => void;
  type: ModalType;
  fruit: Fruit;
  reloadFruits: () => Promise<void>;
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
  reloadFruits,
}: ConfirmationModalProps) => {
  const [newPrice, setNewPrice] = useState<number>(fruit.price);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { contract, signer } = useWeb3();
  const { sellFruit, buyFruit, rateSeller } = contractActions(contract!);
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

  const verifyOwnerShip = () => {
    return signer?.address === fruit.owner;
  };

  const handleSubmit = async (values: FormValuesRate) => {
    if (type === ModalType.RATE) {
      if (form.errors.comment || form.errors.rating) return;
      try {
        await rateSeller(values.comment, values.rating, fruit.id);
      } catch (error) {
        console.error(error);
        handleError(
          "Error Rating",
          "Could not rate the user at this time",
          "red"
        );
      }
    }
  };

  const handleConfirmClick = async () => {
    try {
      setIsProcessing(true);
      if (type === ModalType.RATE) {
        await form.onSubmit(handleSubmit)();
        close();
      } else if (type === ModalType.SELL) {
        await sellFruit(fruit.id, newPrice);
        close();
        await reloadFruits();
      } else if (type == ModalType.BUY) {
        await buyFruit(fruit.id, fruit.price);
        close();
        await reloadFruits();
      }
    } catch (error) {
      console.error("Error processing transaction:", error);
      handleError(
        DEFAULT_NOTI_TITLE,
        DEFAULT_NOTI_MESSAGE_TRANSACTION_FAIL,
        "red"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal opened={opened} onClose={close} centered>
      <LoadingOverlay
        visible={isProcessing}
        zIndex={1000}
        overlayProps={{ blur: 2 }}
      />
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

        {verifyOwnerShip() && type === ModalType.BUY ? (
          <Text c="red">You cannot buy your own fruit</Text>
        ) : (
          <ButtonGroup
            submit={() => handleConfirmClick()}
            cancel={close}
            leftLabel="Cancel"
            rightLabel="Confirm"
          />
        )}
      </Stack>
    </Modal>
  );
};

export default ConfirmationModal;
