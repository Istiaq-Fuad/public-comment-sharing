import { useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";

type THashtagList = {
  feedbackList: TFeedbackItem[];
  setActiveCompany: React.Dispatch<React.SetStateAction<string>>;
};

function HashtagList({ feedbackList, setActiveCompany }: THashtagList) {
  const [activeButton, setActiveButton] = useState("0");

  const buttonClickHandler = (buttonIndex: string, hashtag: string) => {
    setActiveButton(buttonIndex);
    setActiveCompany(hashtag);
  };

  const companyNames = useMemo(() => {
    let hashtagList = feedbackList.map((feedback) => {
      const hashtag = feedback.text
        .split(" ")
        .find((t) => t.includes("#"))!
        .slice(1)
        .replace(",", "")
        .replace(".", "");
      const id = feedback.id;
      return { hashtag, id };
    });

    hashtagList = [{ hashtag: "All", id: "0" }, ...hashtagList];
    return hashtagList;
  }, [feedbackList]);

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
