import Spinner from "./Spinner";
import FeedbackItem from "./FeedbackItem";
import ErrorMessage from "./ErrorMessage";
import { useFeedbackItemsStore } from "../stores/feedbackItemsStore";

function FeedbackList() {
  const { filteredFeedback, isLoading, errorMessage } = useFeedbackItemsStore();

  return (
    <div
      className={`feedback-list ${
        isLoading || errorMessage ? "feedback-list-center" : ""
      }`}
    >
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {filteredFeedback().map((feedback) => {
        return <FeedbackItem key={feedback.id} feedback={feedback} />;
      })}
    </div>
  );
}

export default FeedbackList;
