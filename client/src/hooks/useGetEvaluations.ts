import { useEffect, useState } from "react";
import useWeb3 from "./useWeb3";
import { handleError } from "../models/Errors";
import { Eval } from "../models/Eval";

const useGetEvaluations = () => {
  const { contract } = useWeb3();
  const [ratings, setRatings] = useState<Eval[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadEvaluations = async () => {
    setLoading(true);
    if (!contract) {
      setLoading(false);
      return;
    }

    try {
      const fetchedRatings = await contract.getUserRatings();
      const myRatings: Eval[] = [];

      if (fetchedRatings) {
        fetchedRatings.forEach((rating: Eval) => {
          myRatings.push({
            buyer: rating.buyer,
            comment: rating.comment,
            rating: Number(rating.rating),
          });
        });
        setRatings(myRatings);
      } else {
        setRatings([]);
      }
    } catch (error) {
      console.error("Error while loading ratings :", error);
      handleError("Error with ratings", "Could not get ratings", "red");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvaluations();
  }, [contract]);

  return { ratings, loading };
};

export default useGetEvaluations;
