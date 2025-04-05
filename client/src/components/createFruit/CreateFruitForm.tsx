import { Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ethers } from "ethers";
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
} from "../../models/constants";


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
      const priceInWei = ethers.parseUnits(values.price, "ether");
      const tx = await contract.addFruit(values.fruitName, priceInWei);
      await tx.wait();

      setUiState(CreatingFruitFormState.SUCCESS);
      setMessage(() => FRUIT_CREATION_SUCCESS(values.fruitName));
      form.reset();
    } catch (error: any) {
      const reason = error?.reason || FRUIT_CREATION_FAILED;
      setMessage(reason);
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
