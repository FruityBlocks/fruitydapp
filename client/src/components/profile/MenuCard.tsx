import { ActionIcon, Menu } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { ModalType } from "../../utils/enums";

interface MenuCardProps {
  onSelect: (value: ModalType) => void;
}

const MenuCard = ({ onSelect }: MenuCardProps) => {
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
        <Menu.Item onClick={() => onSelect(ModalType.SELL)}>
          Sell this fruit
        </Menu.Item>
        <Menu.Item onClick={() => onSelect(ModalType.RATE)}>
          Rate Seller
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default MenuCard;
