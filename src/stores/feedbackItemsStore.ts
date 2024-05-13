import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

const url = "http://localhost:3000/feedbacks";

type Store = {
  feedbackList: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  activeCompany: string;
  setActiveCompany: (company: string) => void;
  fetchFeedbackData: () => Promise<void>;
  postFeedback: (feedbackText: string, companyName: string) => void;
  filteredFeedback: () => TFeedbackItem[];
  companyNames: () => { hashtag: string; id: string }[];
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackList: [],
  isLoading: false,
  errorMessage: "",
  activeCompany: "All",

  setActiveCompany: (company: string) =>
    set(() => ({ activeCompany: company })),

  fetchFeedbackData: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      set(() => ({ feedbackList: data }));
      set(() => ({ isLoading: false }));
    } catch (error) {
      set(() => ({ isLoading: false }));
      set(() => ({
        errorMessage: "Something went wrong! Please try again later...",
      }));
    }
  },

  postFeedback: (feedbackText: string, companyName: string) => {
    const newFeedback: TFeedbackItem = {
      id: Date.now().toString(),
      company: companyName,
      badgeLetter: companyName[0].toUpperCase(),
      upvoteCount: 0,
      daysAgo: 0,
      text: feedbackText,
    };

    set((state) => ({ feedbackList: [...state.feedbackList, newFeedback] }));

    fetch("http://localhost:3000/feedbacks/", {
      method: "POST",
      body: JSON.stringify(newFeedback),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((e) => console.log(e));
  },

  filteredFeedback: () => {
    const { feedbackList, activeCompany } = get();
    return activeCompany === "All"
      ? feedbackList
      : feedbackList.filter(
          (feedback) =>
            feedback.company.toLowerCase() === activeCompany.toLowerCase()
        );
  },

  companyNames: () => {
    const { feedbackList } = get();
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
  },
}));
