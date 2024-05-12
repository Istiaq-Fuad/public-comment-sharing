import { useState } from "react";
import { TFeedbackItem } from "../lib/types";
import { TriangleUpIcon } from "@radix-ui/react-icons";

function FeedbackItem({ feedback }: { feedback: TFeedbackItem }) {
  const [upvoteState, setUpvoteState] = useState(feedback.upvoteCount);
  const [showTriangle, setShowTriangle] = useState(true);
  const [expandFeedback, setExpandFeedback] = useState(false);

  const upvoteHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setUpvoteState((prev) => {
      const newUpvoteState = prev + 1;

      fetch(`http://localhost:3000/feedbacks/${feedback.id}`, {
        method: "PATCH",
        body: JSON.stringify({ upvoteCount: newUpvoteState }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).catch((e) => console.log(e));

      return newUpvoteState;
    });

    setShowTriangle(false);

    e.currentTarget.disabled = true;
    e.stopPropagation();
  };

  return (
    <div
      className={`feedback ${expandFeedback ? "feedback-expand" : ""}`}
      onClick={() => setExpandFeedback((prev) => !prev)}
    >
      <div className="upvote-container">
        <button className="vote-count-button" onClick={upvoteHandler}>
          {showTriangle && <TriangleUpIcon />}
          <span>{upvoteState}</span>
        </button>
      </div>
      <div className="feedback-card">{feedback.badgeLetter}</div>
      <div className="feedback-info">
        <p className="company-name">{feedback.company}</p>
        <p className="feedback-details">{feedback.text}</p>
      </div>
      <div className="day-count">{feedback.daysAgo}d</div>
    </div>
  );
}

export default FeedbackItem;
