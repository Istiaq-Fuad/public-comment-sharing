import { useRef, useState } from "react";
import { MAX_TEXT_LENGTH } from "../lib/constants";
import { TFeedbackItem } from "../lib/types";

function FeedbackForm() {
  const [feedbackText, setFeedbackText] = useState("");
  const [textLength, setTextLength] = useState(MAX_TEXT_LENGTH);
  const [validIndicator, setValidIndicator] = useState(false);
  const [InvalidIndicator, setInvalidIndicator] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const feedbackTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newText = e.target.value;

    newText = newText.replace("\n", "");

    if (newText.length <= MAX_TEXT_LENGTH) {
      setFeedbackText(newText);
      setTextLength(MAX_TEXT_LENGTH - newText.length);
    }
  };

  const postFeedback = (companyName: string) => {
    const newFeedback: TFeedbackItem = {
      id: Date.now().toString(),
      company: companyName,
      badgeLetter: companyName[0].toUpperCase(),
      upvoteCount: 0,
      daysAgo: 0,
      text: feedbackText,
    };

    fetch("http://localhost:3000/feedbacks/", {
      method: "POST",
      body: JSON.stringify(newFeedback),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((e) => console.log(e));

    setFeedbackText("");
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let text = feedbackText
      .split(" ")
      .find((t) => t.includes("#"))!
      .substring(1);

    text = text.charAt(0).toUpperCase() + text.slice(1);

    if (text.length > 0 && feedbackText.length > 5) {
      setValidIndicator(true);
      setTimeout(() => setValidIndicator(false), 2000);
      postFeedback(text);
    } else {
      setInvalidIndicator(true);
      setTimeout(() => setInvalidIndicator(false), 2000);
    }
  };

  // const textareaElement = textareaRef.current;
  // useEffect(() => {
  //   const listener = (event: KeyboardEvent) => {
  //     if (event.key === "Enter" && event.metaKey) {
  //       formSubmitHandler();
  //     }
  //   };
  //   if (textareaElement) {
  //     textareaElement.addEventListener("keydown", listener);
  //   }
  //   return () => {
  //     if (textareaElement) {
  //       textareaElement.removeEventListener("keydown", listener);
  //     }
  //   };
  // }, [textareaElement, formSubmitHandler]);

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
        ref={textareaRef}
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
