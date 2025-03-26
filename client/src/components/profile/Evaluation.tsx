import { Card, Rating, Stack, Text } from "@mantine/core";
import { Eval } from "../../tempData";

interface EvaluationProps {
  index: number;
  eval: Eval;
}

const Evaluation = ({ index, eval: evaluation }: EvaluationProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" style={{ width: "fit-content" }}>
      <Stack>
        <Rating value={evaluation.rating} readOnly />
        <Text>{evaluation.comment}</Text>
      </Stack>
    </Card>
  );
};
export default Evaluation;
