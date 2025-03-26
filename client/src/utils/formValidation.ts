export const validateFruitName = (value: string) => {
  if (!/^[a-zA-Z\s]+$/.test(value))
    return "Fruit name must only contain letters";
  if (value.length > 20) return "Fruit name is too long";
  return null;
};

export const validatePrice = (value: string) => {
  const numericValue = Number(value);
  if (isNaN(numericValue) || numericValue <= 0)
    return "Enter a valid positive number";
  return null;
};
