import { Box, Title } from "@mantine/core";
import { evals } from "../tempData";
import GridEvaluations from "../components/profile/GridEvaluations";
import MyFruits from "../components/profile/MyFruits";

const Profile = () => {
  return (
    <Box>
      <Title order={1}>Welcome!</Title>
      <MyFruits />
      <GridEvaluations evals={evals} />
    </Box>
  );
};
export default Profile;
