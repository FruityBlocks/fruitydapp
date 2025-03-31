import { useNavigate, useLocation } from "react-router";
import useWeb3 from "../hooks/useWeb3";
import { Button, Title, Flex, Container, Image } from "@mantine/core";
import { useEffect } from "react";

const ConnectWallet = () => {
  const { account, connectWallet } = useWeb3();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (account) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [account, navigate, location]);

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Connection failed", error);
    }
  };

  return (
    <Container size="xs">
      <Flex gap="md" justify="center" align="center" direction="column" h="75%">
        <Image src="/LogoFruity.png" draggable="false" />
        <Title order={1} ta="center">
          Connect Your Wallet
        </Title>
        <Button mb={20} onClick={handleConnect} size="md">
          Connect Wallet
        </Button>
      </Flex>
    </Container>
  );
};

export default ConnectWallet;