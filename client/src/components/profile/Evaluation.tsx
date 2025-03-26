import { Card, Rating, Stack, Text } from "@mantine/core";
import { Eval } from "../../tempData";

interface EvaluationProps {
  eval: Eval;
}

const Evaluation = ({ eval: evaluation }: EvaluationProps) => {
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
