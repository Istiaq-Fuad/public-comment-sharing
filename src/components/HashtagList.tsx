import { useState } from "react";
import { useFeedbackContext } from "../lib/hooks/useFeedbackContext";

function HashtagList() {
  const [activeButton, setActiveButton] = useState("0");
  const { setActiveCompany, companyNames } = useFeedbackContext();

  const buttonClickHandler = (buttonIndex: string, hashtag: string) => {
    setActiveButton(buttonIndex);
    setActiveCompany(hashtag);
  };

  return (
    <div className="hashtag-list">
      <ul>
        {companyNames.map(({ hashtag, id }) => (
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
