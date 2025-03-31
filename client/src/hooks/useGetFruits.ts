import { useEffect, useState } from "react";
import useWeb3 from "./useWeb3";
import { IconLemon } from "@tabler/icons-react";
import Web3 from "web3";
import { Fruit } from "../models/Fruit";

const useGetFruits = () => {
  const { contract } = useWeb3();
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadFruits = async () => {
    setLoading(true);
    if (!contract) {
      setLoading(false);
      return;
    }

    try {
      const fruitsCount = await contract.getFruitsCount();
      const fruitsArray: Fruit[] = [];

      for (let i = 0; i < fruitsCount; i++) {
        const fruit = await contract.getFruit(i);
        fruitsArray.push({
          name: fruit[0],
          icon: IconLemon,
          type: fruit[1],
          price: Number(Web3.utils.fromWei(fruit[2], "ether")),
          seller: fruit[3],
        });
      }

      setFruits(fruitsArray);
    } catch (error) {
      console.error("Erreur lors du chargement des fruits :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFruits();
  }, [contract]);

  return { fruits, loading };
};

export default useGetFruits;
