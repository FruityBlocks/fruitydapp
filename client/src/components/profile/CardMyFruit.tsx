import { Card, Group, Stack, Text } from "@mantine/core";
import { IconCurrencyEthereum } from "@tabler/icons-react";
import { Fruit } from "../../tempData";

interface CardMyFruitsProps {
  item: Fruit;
}

const CardMyFruit = ({ item }: CardMyFruitsProps) => {
  return (
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
      </Stack>
    </Card>
  );
};

export default CardMyFruit;
