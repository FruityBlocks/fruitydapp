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

export const validateComment = (value: string) => {
  if (value.length > 200)
    return "Comment cannot be longer than 200 characters.";
  if (/[^a-zA-Z0-9\s]/.test(value))
    return "Comment cannot contain special characters.";
  return null;
};