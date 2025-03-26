import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { Fruit } from "../../tempData";
import { IconCurrencyEthereum } from "@tabler/icons-react";

interface ConfirmationModalProps {
  opened: boolean;
  close: () => void;
  item: Fruit;
}

const ConfirmationModal = ({ opened, close, item }: ConfirmationModalProps) => {
  return (
    <Modal opened={opened} onClose={close} centered>
      <Title size="lg" c="fruity-orange">
        You are about to buy {item.name} for <IconCurrencyEthereum size={20} />{" "}
        {item.price}
      </Title>
      <Stack mt="lg">
        <Text size="md">
          Seller : {item.seller.slice(0, 6)}...{item.seller.slice(-6)}
        </Text>
        <Group mt="lg" justify="flex-end">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button color="green">Confirm</Button>
        </Group>
      </Stack>
    </Modal>
  );
};
export default ConfirmationModal;
