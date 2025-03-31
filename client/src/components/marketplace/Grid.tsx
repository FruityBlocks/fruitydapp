import { SimpleGrid } from "@mantine/core";
import CardFruit from "./CardFruit";
import useWeb3 from "../../hooks/useWeb3";
import { Fruit } from "../../models/Fruit";
import { useEffect, useState } from "react";
import Web3 from "web3";
import { IconLemon } from "@tabler/icons-react";

const MarketPlaceGrid = () => {
  const { contract } = useWeb3();
  const [fruits, setFruits] = useState<Fruit[]>([]);

  useEffect(() => {
    if (contract) {
      loadFruits();
    }
  }, [contract]);

  const loadFruits = async () => {
    if (!contract) return;
    
    try {
      const fruitsCount = await contract.methods.getFruitsCount().call();
      let fruitsArray: Fruit[] = [];

      for (let i = 0; i < fruitsCount; i++) {
        const fruit = await contract.methods.getFruit(i).call();
        fruitsArray.push({
          name: fruit[0],
          icon: IconLemon,
          type: fruit[1],
          price: Number(Web3.utils.fromWei(fruit[2], "ether")),
          seller: fruit[3]
        });
      }

      setFruits(fruitsArray);
    } catch (error) {
      console.error("Erreur lors du chargement des fruits :", error);
    }
  };

  return (
    <SimpleGrid mb={50} mt={50} cols={{ base: 1, sm: 3, lg: 3 }} spacing="lg">
      {fruits.map((item, index) => (
        <CardFruit key={index} item={item} />
      ))}
    </SimpleGrid>
  );
};

export default MarketPlaceGrid;
