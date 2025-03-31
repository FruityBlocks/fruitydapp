import { useContext } from "react";
import { Web3Context } from "../providers/Web3Provider"; // Import from Web3Provider
import { Web3ContextType } from "../models/interfaces";

const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

export default useWeb3;
