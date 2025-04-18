import { Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreatingFruitFormState } from "../../utils/enums";
import useWeb3 from "../../hooks/useWeb3";
import { validateFruitName, validatePrice } from "../../utils/formValidation";
import FormView from "./createFruitForm/Form";
import Loading from "./createFruitForm/Loading";
import Result from "./createFruitForm/Result";
import {
  FRUIT_CREATION_FAILED,
  FRUIT_CREATION_SUCCESS,
} from "../../utils/constants";
import { contractActions } from "../../api/api";

interface FormFruits {
  fruitName: string;
  price: string;
}

const CreateFruitForm = () => {
  const { contract, account } = useWeb3();
  const [uiState, setUiState] = useState<
    | CreatingFruitFormState.IDLE
    | CreatingFruitFormState.LOADING
    | CreatingFruitFormState.ERROR
    | CreatingFruitFormState.SUCCESS
  >(CreatingFruitFormState.IDLE);
  const [message, setMessage] = useState<string>("");
  const [fruitCreated, setFruitCreated] = useState<string>("");
  const { createFruit } = contractActions(contract!);

  const form = useForm<FormFruits>({
    initialValues: {
      fruitName: "",
      price: "",
    },
    validate: {
      fruitName: validateFruitName,
      price: validatePrice,
    },
  });

  const handleFormSubmit = async (values: FormFruits) => {
    if (!contract || !account) {
      setMessage("Wallet not connected or contract unavailable.");
      setUiState(CreatingFruitFormState.ERROR);
      return;
    }

    setUiState(CreatingFruitFormState.LOADING);
    setMessage("");
    setFruitCreated(values.fruitName);

    try {
      await createFruit(values.fruitName, values.price);

      setUiState(CreatingFruitFormState.SUCCESS);
      setMessage(() => FRUIT_CREATION_SUCCESS(values.fruitName));
      form.reset();
    } catch (error) {
      console.error(error);
      setMessage(FRUIT_CREATION_FAILED);
      setUiState(CreatingFruitFormState.ERROR);
    }
  };

  const resetUI = () => {
    setUiState(CreatingFruitFormState.IDLE);
    setMessage("");
    setFruitCreated("");
    form.reset();
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
    >
      <Box w={350}>
        <AnimatePresence mode="wait">
          {uiState === CreatingFruitFormState.IDLE && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <FormView
                form={form}
                onSubmit={handleFormSubmit}
                reset={resetUI}
              />
            </motion.div>
          )}
          {uiState === CreatingFruitFormState.LOADING && (
            <Loading fruitCreated={fruitCreated} />
          )}
          {(uiState === CreatingFruitFormState.SUCCESS ||
            uiState === CreatingFruitFormState.ERROR) && (
            <Result message={message} uiState={uiState} onReset={resetUI} />
          )}
        </AnimatePresence>
      </Box>
    </div>
  );
};

export default CreateFruitForm;
