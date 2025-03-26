import { Box, Title } from "@mantine/core";
import { evals } from "../tempData";
import GridEvaluations from "../components/profile/GridEvaluations";
import MyFruits from "../components/profile/MyFruits";
import { useWeb3 } from "../providers/Web3Provider";

const Profile = () => {
  const { account } = useWeb3();
  return (
    <Box>
      <Title order={1}>Welcome!</Title>
      <Title mt={10} order={5}>
        Account : {account ? account : ""}
      </Title>
      <MyFruits />
      <GridEvaluations evals={evals} />
    </Box>
  );
};
export default Profile;
