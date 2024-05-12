import Spinner from "./Spinner";
import FeedbackItem from "./FeedbackItem";
import ErrorMessage from "./ErrorMessage";
import { TFeedbackItem } from "../lib/types";

type FeedbackListPropType = {
  isLoading: boolean;
  errorMessage: string;
  feedbackList: TFeedbackItem[];
  activeCompany: string;
};

function FeedbackList({
  isLoading,
  errorMessage,
  feedbackList,
  activeCompany,
}: FeedbackListPropType) {
  
  const filteredFeedback =
    activeCompany === "All"
      ? feedbackList
      : feedbackList.filter(
          (feedback) =>
            feedback.company.toLowerCase() === activeCompany.toLowerCase()
        );

  return (
    <div
      className={`feedback-list ${
        isLoading || errorMessage ? "feedback-list-center" : ""
      }`}
    >
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {filteredFeedback.map((feedback) => {
        return <FeedbackItem key={feedback.id} feedback={feedback} />;
      })}
    </div>
  );
}

export default FeedbackList;
