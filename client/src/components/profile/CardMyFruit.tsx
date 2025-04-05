import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import { IconCurrencyEthereum, IconLemon } from "@tabler/icons-react";
import ConfirmationModal from "../marketplace/ConfirmationModal";
import { useDisclosure } from "@mantine/hooks";
import { ModalType } from "../../utils/enums";
import { Fruit } from "../../models/Fruit";

interface CardMyFruitsProps {
  item: Fruit;
}

const CardMyFruit = ({ item }: CardMyFruitsProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Card
        key={item.owner}
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
          <IconLemon size={32} />
          <Text size="lg" c="green">
            Current Price :
            <IconCurrencyEthereum size={17} />
            {item.price}
          </Text>
          <Badge onClick={open} color="fruity-orange.2" variant="light">
            Rate Seller
          </Badge>
        </Stack>
      </Card>
      <ConfirmationModal
        fruit={item}
        opened={opened}
        close={close}
        type={ModalType.RATE}
      />
    </>
  );
};

export default CardMyFruit;
