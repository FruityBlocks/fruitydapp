import { Button, Group } from "@mantine/core";

interface ButtonGroupProps {
  rightLabel: string;
  leftLabel: string;
  reset?: () => void;
  cancel?: () => void;
}

const ButtonGroup = ({
  cancel,
  reset,
  rightLabel,
  leftLabel,
}: ButtonGroupProps) => {
  return (
    <Group mt="lg" justify="flex-end">
      <Button
        variant="outline"
        onClick={() => {
          if (reset) reset();
          if (cancel) cancel();
        }}
      >
        {leftLabel}
      </Button>
      <Button type="submit" color="green">
        {rightLabel}
      </Button>
    </Group>
  );
};

export default ButtonGroup;
