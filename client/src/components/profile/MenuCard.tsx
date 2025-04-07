import { ActionIcon, Menu } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { ModalType } from "../../utils/enums";
import { Fruit } from "../../models/Fruit";

interface MenuCardProps {
  onSelect: (value: ModalType) => void;
  item: Fruit;
  reloadFruits: () => void;
}

const MenuCard = ({ onSelect, item }: MenuCardProps) => {
  return (
    <Menu shadow="md" width={150} position="top-end" withinPortal>
      <Menu.Target>
        <ActionIcon
          variant="subtle"
          color="gray"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <IconDots size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {!item.forSale && (
          <Menu.Item onClick={() => onSelect(ModalType.SELL)}>
            Sell this fruit
          </Menu.Item>
        )}
        <Menu.Item onClick={() => onSelect(ModalType.RATE)}>
          Rate Seller
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default MenuCard;
