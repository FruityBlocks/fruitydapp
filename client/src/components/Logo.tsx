import { Text, Box } from "@mantine/core";
import { IconLemon } from "@tabler/icons-react";
import { useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <Box
      component="div"
      onClick={handleClick}
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Text
        variant="gradient"
        gradient={{ from: "fruity-orange", to: "white", deg: 45 }}
        fw={700}
        fz="xl"
        style={{
          fontFamily: "'Lobster', system-ui",
          letterSpacing: "-1px",
        }}
      >
        FruityBlocks
        <IconLemon size={20} color="white" />
      </Text>
    </Box>
  );
};

export default Logo;
