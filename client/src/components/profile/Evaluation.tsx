import { Badge, Card, Rating, Stack, Text } from "@mantine/core";
import { Eval } from "../../models/Eval";

interface EvaluationProps {
  eval: Eval;
}

const Evaluation = ({ eval: evaluation }: EvaluationProps) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ cursor: "pointer", position: "relative" }}
    >
      <Stack>
        <Rating value={evaluation.rating} readOnly />
        <Text>
          {evaluation.comment === ""
            ? "No comment entered."
            : evaluation.comment}
        </Text>
        <Badge color="fruity-orange.4">
          {evaluation.buyer.slice(0, 4) + "..." + evaluation.buyer.slice(-4)}
        </Badge>
      </Stack>
    </Card>
  );
};
export default Evaluation;
