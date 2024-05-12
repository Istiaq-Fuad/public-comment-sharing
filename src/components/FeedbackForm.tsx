import { useState } from "react";
import { MAX_TEXT_LENGTH } from "../lib/constants";
import { useFeedbackContext } from "../lib/hooks/useFeedbackContext";

function FeedbackForm() {
  const [feedbackText, setFeedbackText] = useState("");
  const [validIndicator, setValidIndicator] = useState(false);
  const [InvalidIndicator, setInvalidIndicator] = useState(false);

  const { postFeedback } = useFeedbackContext();

  const feedbackTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newText = e.target.value;

    newText = newText.replace("\n", "");

    if (newText.length <= MAX_TEXT_LENGTH) {
      setFeedbackText(newText);
    }
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let companyName = feedbackText.split(" ").find((t) => t.includes("#"));

    if (companyName && companyName.length > 0 && feedbackText.length > 5) {
      setValidIndicator(true);
      setTimeout(() => setValidIndicator(false), 2000);
      companyName = companyName.slice(1).replace(",", "").replace(".", "");
      companyName = companyName.charAt(0).toUpperCase() + companyName.slice(1);
      postFeedback(feedbackText, companyName);
      setFeedbackText("");
    } else {
      setInvalidIndicator(true);
      setTimeout(() => setInvalidIndicator(false), 2000);
    }
  };

  return (
    <form
      name="feedback-form"
      spellCheck="false"
      onSubmit={formSubmitHandler}
      className={`${validIndicator ? "form-valid" : ""} ${
        InvalidIndicator ? "form-invalid" : ""
      }`}
    >
      <textarea
        value={feedbackText}
        onChange={feedbackTextHandler}
        placeholder="Enter your feedback here, Remember to #hashtag the company"
      />
      <div className="form-data">
        <button type="submit">submit</button>
        <p className="word-counter">{MAX_TEXT_LENGTH - feedbackText.length}</p>
      </div>
    </form>
  );
}

export default FeedbackForm;
