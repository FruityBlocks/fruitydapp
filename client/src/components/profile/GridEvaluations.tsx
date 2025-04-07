import { Box, SimpleGrid, Text, Title } from "@mantine/core";
import Evaluation from "./Evaluation";
import useGetEvaluations from "../../hooks/useGetEvaluations";

const GridEvaluations = () => {
  const { ratings } = useGetEvaluations();
  return (
    <Box>
      <Title order={3}>What buyers think about you</Title>
      <SimpleGrid mb={50} mt={20} cols={{ base: 2, sm: 4, lg: 5 }} spacing="lg">
        {ratings.length > 0 ? (
          ratings.map((item, index) => <Evaluation key={index} eval={item} />)
        ) : (
          <Text c="red" size="xl">
            No rating yet.
          </Text>
        )}
      </SimpleGrid>
    </Box>
  );
};
export default GridEvaluations;
