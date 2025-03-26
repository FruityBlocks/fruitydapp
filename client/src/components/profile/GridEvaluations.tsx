import { Box, SimpleGrid, Title } from "@mantine/core";
import Evaluation from "./Evaluation";
import { Eval } from "../../tempData";

interface GridEvaluationsProps {
  evals: Eval[];
}

const GridEvaluations = ({ evals }: GridEvaluationsProps) => {
  return (
    <Box>
      <Title order={3}>What buyers think about you</Title>
      <SimpleGrid mb={50} mt={20} cols={{ base: 2, sm: 4, lg: 5 }} spacing="lg">
        {evals?.map((item, index) => (
          <Evaluation index={index} eval={item} />
        ))}
      </SimpleGrid>
    </Box>
  );
};
export default GridEvaluations;
