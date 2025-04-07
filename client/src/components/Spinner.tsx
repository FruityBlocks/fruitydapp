import { Box, Loader } from "@mantine/core";

const Spinner = () => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Loader />
    </Box>
  );
};

export default Spinner;
