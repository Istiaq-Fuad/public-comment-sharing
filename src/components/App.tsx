import { useEffect, useState } from "react";
import Container from "./Container";
import FeedbackList from "./FeedbackList";
import Footer from "./Footer";
import HashtagList from "./HashtagList";
import { TFeedbackItem } from "../lib/types";

function App() {
  const [feedbackList, setFeedbackList] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeCompany, setActiveCompany] = useState("All");
  const url = "http://localhost:3000/feedbacks";
  // https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks

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
    <>
      <Container>
        <HashtagList
          feedbackList={feedbackList}
          setActiveCompany={setActiveCompany}
        />
        <Footer />
        <FeedbackList
          isLoading={isLoading}
          errorMessage={errorMessage}
          feedbackList={feedbackList}
          activeCompany={activeCompany}
        />
      </Container>
    </>
  );
}

export default App;
