import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import { IconCurrencyEthereum } from "@tabler/icons-react";
import { Fruit } from "../../tempData";
import ConfirmationModal from "../marketplace/ConfirmationModal";
import { useDisclosure } from "@mantine/hooks";
import { ModalType } from "../../utils/enums";

interface CardMyFruitsProps {
  item: Fruit;
}

const CardMyFruit = ({ item }: CardMyFruitsProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Card
        key={item.seller}
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{
          cursor: "pointer",
        }}
      >
        <Stack align="center" justify="center">
          <Group align="center">
            <Text
              size="xl"
              c={"fruity-orange"}
              style={{
                fontWeight: 600,
              }}
            >
              {item.name}
            </Text>
          </Group>
          <item.icon size={32} />
          <Text size="sm" c="dimmed">
            Type: {item.type}
          </Text>
          <Text size="lg" c="green">
            Bought For
            <IconCurrencyEthereum size={17} />
            {item.price}
          </Text>
          <Badge onClick={open} color="fruity-orange.2" variant="light">
            Rate Seller
          </Badge>
        </Stack>
      </Card>
      <ConfirmationModal
        item={item}
        opened={opened}
        close={close}
        type={ModalType.RATE}
      />
    </>
  );
};

export default CardMyFruit;
