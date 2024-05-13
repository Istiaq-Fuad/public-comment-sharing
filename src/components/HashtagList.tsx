import { useState } from "react";
import { useFeedbackItemsStore } from "../stores/feedbackItemsStore";

function HashtagList() {
  const [activeButton, setActiveButton] = useState("0");
  const { companyNames, setActiveCompany } = useFeedbackItemsStore();

  const buttonClickHandler = (buttonIndex: string, hashtag: string) => {
    setActiveButton(buttonIndex);
    setActiveCompany(hashtag);
  };

  return (
    <div className="hashtag-list">
      <ul>
        {companyNames().map(({ hashtag, id }) => (
          <li key={id}>
            <button
              id={`${activeButton === id ? "active" : ""}`}
              onClick={() => buttonClickHandler(id, hashtag)}
            >
              #{hashtag}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HashtagList;
