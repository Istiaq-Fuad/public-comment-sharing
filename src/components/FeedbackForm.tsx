import { useState } from "react";
import { MAX_TEXT_LENGTH } from "../lib/constants";
import { useFeedbackItemsStore } from "../stores/feedbackItemsStore";

function FeedbackForm() {
  const [feedbackText, setFeedbackText] = useState("");
  const [textLength, setTextLength] = useState(MAX_TEXT_LENGTH);
  const [validIndicator, setValidIndicator] = useState(false);
  const [InvalidIndicator, setInvalidIndicator] = useState(false);
  const { postFeedback } = useFeedbackItemsStore();

  const feedbackTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newText = e.target.value;

    newText = newText.replace("\n", "");

    if (newText.length <= MAX_TEXT_LENGTH) {
      setFeedbackText(newText);
      setTextLength(MAX_TEXT_LENGTH - newText.length);
    }
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let company = feedbackText.split(" ").find((t) => t.includes("#"));

    if (company && company.length > 1 && feedbackText.length > 5) {
      company = company.substring(1);
      company = company.charAt(0).toUpperCase() + company.slice(1);
      setValidIndicator(true);
      setTimeout(() => setValidIndicator(false), 2000);
      postFeedback(feedbackText, company);
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
        <p className="word-counter">{textLength}</p>
      </div>
    </form>
  );
}

export default FeedbackForm;
