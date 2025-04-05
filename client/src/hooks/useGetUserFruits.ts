import { useEffect, useState } from "react";
import useWeb3 from "./useWeb3";
import { Fruit } from "../models/Fruit";
import Web3 from "web3";

const useGetUserFruits = () => {
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
      const userFruits = await contract.getUserFruits();
      if (userFruits && Object.keys(userFruits).length > 0) {
        const fruitIds = Object.values(userFruits);

        const fruitPromises = fruitIds.map(async (id) => {
          const [fruitId, name, priceInWei, owner, isForSale] =
            await contract.getUserFruit(id);
          const price = Web3.utils.fromWei(priceInWei, "ether");

          return {
            id: Number(fruitId),
            name: String(name),
            price: Number(price),
            owner: String(owner),
            forSale: Boolean(isForSale),
          };
        });
        const fruits: Fruit[] = await Promise.all(fruitPromises);

        setFruits(fruits);
      } else {
        setFruits([]);
      }
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

export default useGetUserFruits;
