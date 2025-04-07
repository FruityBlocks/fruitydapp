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
  rateSeller: async (comment: string, rating: number, fruitId: number) => {
    const tx = await contract.rate(comment, rating, fruitId);
    await tx.wait();
    return tx;
  },
  createFruit: async (name: string, price: string) => {
    const tx = await contract.addFruit(name, parseEther(price.toString()));
    await tx.wait();
    return tx;
  },
  // We will need to edit the listing here !
});
