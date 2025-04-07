import { Contract, parseEther } from "ethers";

export const contractActions = (contract: Contract) => ({
  sellFruit: async (fruitId: number, price: number) => {
    const tx = await contract.sellFruit(fruitId, parseEther(price.toString()));
    await tx.wait();
    return tx;
  },
  buyFruit: async (fruitId: number, price: number) => {
    const tx = await contract.buyFruit(fruitId, {
      value: parseEther(price.toString()),
    });
    await tx.wait();
    return tx;
  },
});
