import Spinner from "./Spinner";
import FeedbackItem from "./FeedbackItem";
import ErrorMessage from "./ErrorMessage";
import { useFeedbackContext } from "../lib/hooks/useFeedbackContext";

function FeedbackList() {
  const { isLoading, errorMessage, feedbackList } = useFeedbackContext();

  return (
    <div
      className={`feedback-list ${
        isLoading || errorMessage ? "feedback-list-center" : ""
      }`}
    >
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {feedbackList.map((feedback) => {
        return <FeedbackItem key={feedback.id} feedback={feedback} />;
      })}
    </div>
  );
}

export default FeedbackList;
