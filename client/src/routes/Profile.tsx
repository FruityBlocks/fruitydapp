import { Box, Title } from "@mantine/core";
import GridEvaluations from "../components/profile/GridEvaluations";
import MyFruits from "../components/profile/MyFruits";
import useWeb3 from "../hooks/useWeb3";

const Profile = () => {
  const { account } = useWeb3();
  return (
    <Box>
      <Title order={1}>Welcome!</Title>
      <Title mt={10} order={5}>
        Account :{" "}
        {account ? account.slice(0, 4) + "..." + account.slice(-4) : ""}
      </Title>
      <MyFruits />
      <GridEvaluations />
    </Box>
  );
};
export default Profile;
