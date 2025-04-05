import { Card } from "@mantine/core";
import ConfirmationModal from "../marketplace/ConfirmationModal";
import { useDisclosure } from "@mantine/hooks";
import { ModalType } from "../../utils/enums";
import { Fruit } from "../../models/Fruit";
import { useState } from "react";
import MenuCard from "./MenuCard";
import CardInfos from "./CardInfos";

interface CardMyFruitsProps {
  item: Fruit;
}

const CardMyFruit = ({ item }: CardMyFruitsProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const handleOpenModal = (type: ModalType) => {
    setModalType(type);
    open();
  };

  return (
    <>
      <Card
        key={item.owner}
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ cursor: "pointer", position: "relative" }}
      >
        <MenuCard onSelect={handleOpenModal} />

        <CardInfos item={item} />
      </Card>

      {modalType && (
        <ConfirmationModal
          fruit={item}
          opened={opened}
          close={() => {
            close();
            setModalType(null);
          }}
          type={modalType}
        />
      )}
    </>
  );
};

export default CardMyFruit;
