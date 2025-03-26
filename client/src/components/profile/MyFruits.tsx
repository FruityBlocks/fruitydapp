import { Box, Title } from "@mantine/core";
import GridMyFruits from "./GridMyFruits";

const MyFruits = () => {
  return (
    <Box mt={10}>
      <Title order={3}>Your fruits</Title>
      <GridMyFruits />
    </Box>
  );
};
export default MyFruits;
