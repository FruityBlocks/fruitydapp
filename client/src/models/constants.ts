export const FRUIT_CREATION_FAILED =
  "❌ Failed to create fruit. Please try again.";

export const FRUIT_CREATION_SUCCESS = (fruitName: string) => {
  return `✅ ${fruitName} has been created! It is now your fruit! Feel free to sell or keep it!`;
};
