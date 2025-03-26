import { Box, Title } from "@mantine/core";
import { evals } from "../tempData";
import GridEvaluations from "../components/profile/GridEvaluations";
import GridMyFruits from "../components/profile/GridMyFruits";

const Profile = () => {
  return (
    <Box>
      <Title order={1}>Profile</Title>
      <GridMyFruits />
      <GridEvaluations evals={evals} />
    </Box>
  );
};
export default Profile;
