import { Box, Title } from "@mantine/core";

const Home = () => {
  return (
    <Box
      display="flex"
      style={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Title order={1} style={{ marginBottom: 10 }}>
        Welcome to FruityBlocks!
      </Title>
      <img src="/LogoFruity.png" draggable="false" width={300} height={300} />
    </Box>
  );
};

export default Home;
