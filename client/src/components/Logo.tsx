import { Text, Box } from "@mantine/core";
import { IconApple } from "@tabler/icons-react";
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
          letterSpacing: "-1px",
        }}
      >
        FruityBlocks
        <IconApple size={21} color="white" />
      </Text>
    </Box>
  );
};

export default Logo;
