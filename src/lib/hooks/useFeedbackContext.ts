import { useContext } from "react";
import { FeedbackContext } from "../../contexts/FeedbackContextProvider";

export const useFeedbackContext = () => {
    const context = useContext(FeedbackContext);

  if (!context) {
    throw new Error(
      "useFeedbackContext must be used within a FeedbackContextProvider"
    );
  }

  return context;
};
