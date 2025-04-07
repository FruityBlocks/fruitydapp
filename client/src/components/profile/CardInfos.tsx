import { Badge, Group, Stack, Text } from "@mantine/core";
import { IconCurrencyEthereum, IconLemon } from "@tabler/icons-react";
import { Fruit } from "../../models/Fruit";

interface CardInfosProps {
  item: Fruit;
}

const CardInfos = ({ item }: CardInfosProps) => {
  return (
    <Stack align="center" justify="center">
      <Group align="center">
        <Text size="xl" c={"fruity-orange"} style={{ fontWeight: 600 }}>
          {item.name}
        </Text>
      </Group>
      <IconLemon size={32} />
      <Text size="lg" c="green">
        Current Price :
        <IconCurrencyEthereum size={17} />
        {item.price}
      </Text>
      <Badge color={item.forSale ? "fruity-orange.3" : "fruity-black.6"}>
        {item.forSale ? "Currently for sale" : "You own this fruit"}
      </Badge>
    </Stack>
  );
};
export default CardInfos;
