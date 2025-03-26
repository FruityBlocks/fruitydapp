import { Badge, Card, Group, Modal, Stack, Text } from "@mantine/core";
import { Fruit } from "../../tempData";
import { useDisclosure } from "@mantine/hooks";

interface CardFruitProps {
  index: number;
  item: Fruit;
}

const CardFruit = ({ index, item }: CardFruitProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Card
        onClick={open}
        key={index}
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
          <Text size="xl" c="green">
            ${item.price}
          </Text>
          <Badge color="fruity-orange.2" variant="light">
            Seller: {item.seller.slice(0, 6)}...{item.seller.slice(-4)}
          </Badge>
        </Stack>
      </Card>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title="Are you sure you want to buy this item?"
      ></Modal>
    </>
  );
};
export default CardFruit;
