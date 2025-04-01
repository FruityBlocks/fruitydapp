import { Badge, Card, Group, Stack, Text } from "@mantine/core";
import { Fruit } from "../../models/Fruit";
import { useDisclosure } from "@mantine/hooks";
import ConfirmationModal from "./ConfirmationModal";
import { IconCurrencyEthereum } from "@tabler/icons-react";
import { ModalType } from "../../utils/enums";

interface CardFruitProps {
  fruit: Fruit;
}

const CardFruit = ({ fruit }: CardFruitProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  console.log(fruit);
  return (
    <>
      <Card
        onClick={open}
        key={fruit.seller}
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
              {fruit.name}
            </Text>
          </Group>
          <Text size="xl" c="green">
            <IconCurrencyEthereum size={17} />
            {fruit.price}
          </Text>
          <Badge color="fruity-orange.2" variant="light">
            Seller: {fruit.seller.slice(0, 6)}...{fruit.seller.slice(-4)}
          </Badge>
        </Stack>
      </Card>
      <ConfirmationModal
        type={ModalType.BUY}
        fruit={fruit}
        opened={opened}
        close={close}
      />
    </>
  );
};
export default CardFruit;
