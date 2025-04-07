export const FRUIT_CREATION_FAILED =
  "❌ Failed to create fruit. Please try again.";

export const FRUIT_CREATION_SUCCESS = (fruitName: string) => {
  return `✅ ${fruitName} has been created! It is now your fruit! Feel free to sell or keep it!`;
};

export const DEFAULT_NOTI_TITLE = "Error processing transaction";
export const DEFAULT_NOTI_MESSAGE_TRANSACTION_FAIL =
  "Make sure you have enough ETH to make this transaction!";
