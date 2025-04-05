import { Text, TextInput } from "@mantine/core";
import { IconPencil, IconCurrencyEthereum } from "@tabler/icons-react";
import ButtonGroup from "../../ButtonGroup";
import { UseFormReturnType } from "@mantine/form";

interface FormValues {
  fruitName: string;
  price: string;
}

interface FormProps {
  form: UseFormReturnType<FormValues>;
  onSubmit: (values: FormValues) => void;
  reset: () => void;
}

const Form = ({ form, onSubmit, reset }: FormProps) => (
  <form onSubmit={form.onSubmit(onSubmit)}>
    <TextInput
      mt={20}
      label={
        <Text size="lg">
          Fruit Name <IconPencil size={16} />
        </Text>
      }
      placeholder="Enter fruit name"
      {...form.getInputProps("fruitName")}
    />
    <TextInput
      mt={10}
      label={
        <Text size="lg">
          Price <IconCurrencyEthereum size={16} />
        </Text>
      }
      placeholder="Enter price"
      {...form.getInputProps("price")}
    />
    <ButtonGroup reset={reset} rightLabel="Submit" leftLabel="Reset" />
  </form>
);

export default Form;
