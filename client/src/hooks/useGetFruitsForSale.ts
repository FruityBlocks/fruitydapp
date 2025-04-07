import { useEffect, useState } from "react";
import useWeb3 from "./useWeb3";
import { Fruit } from "../models/Fruit";
import Web3 from "web3";

const useGetFruitsForSale = () => {
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
      const fruitsForSale = await contract.getFruitsForSale();
      if (fruitsForSale && Object.keys(fruitsForSale).length > 0) {
        const fruitIds = Object.values(fruitsForSale);

        const fruitPromises = fruitIds.map(async (id) => {
          const [fruitId, name, priceInWei, owner, isForSale] =
            await contract.getFruitForSale(id);
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

  return { fruits, loading, reload: loadFruits };
};

export default useGetFruitsForSale;
