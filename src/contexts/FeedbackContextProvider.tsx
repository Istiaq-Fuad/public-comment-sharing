import { createContext, useEffect, useMemo, useState } from "react";
import { TFeedbackItem } from "../lib/types";

type TFeedbackContext = {
  feedbackList: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  activeCompany: string;
  companyNames: { hashtag: string; id: string }[];
  setActiveCompany: React.Dispatch<React.SetStateAction<string>>;
  postFeedback: (feedbackText: string, companyName: string) => void;
};

export const FeedbackContext = createContext<TFeedbackContext | null>(null);

function FeedbackContextProvider({ children }: { children: React.ReactNode }) {
  const [feedbackList, setFeedbackList] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeCompany, setActiveCompany] = useState("All");
  const url = "http://localhost:3000/feedbacks";

  const filteredFeedback = useMemo(
    () =>
      activeCompany === "All"
        ? feedbackList
        : feedbackList.filter(
            (feedback) =>
              feedback.company.toLowerCase() === activeCompany.toLowerCase()
          ),
    [activeCompany, feedbackList]
  );

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

  const postFeedback = (feedbackText: string, companyName: string) => {
    const newFeedback: TFeedbackItem = {
      id: Date.now().toString(),
      company: companyName,
      badgeLetter: companyName[0].toUpperCase(),
      upvoteCount: 0,
      daysAgo: 0,
      text: feedbackText,
    };

    setFeedbackList((prevFeedbackList) => [...prevFeedbackList, newFeedback]);

    fetch("http://localhost:3000/feedbacks/", {
      method: "POST",
      body: JSON.stringify(newFeedback),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((e) => console.log(e));
  };

  const fetchFeedbackData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setFeedbackList(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Something went wrong! Please try again later...");
    }
  };

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        feedbackList: filteredFeedback,
        isLoading,
        errorMessage,
        activeCompany,
        companyNames,
        setActiveCompany,
        postFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export default FeedbackContextProvider;
