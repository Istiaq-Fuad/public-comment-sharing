import { useEffect } from "react";
import Container from "./Container";
import FeedbackList from "./FeedbackList";
import Footer from "./Footer";
import HashtagList from "./HashtagList";
import { useFeedbackItemsStore } from "../stores/feedbackItemsStore";

function App() {
  // https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks

  const { fetchFeedbackData } = useFeedbackItemsStore();

  useEffect(() => {
    fetchFeedbackData();
  }, [fetchFeedbackData]);

  return (
    <>
      <Container>
        <HashtagList />
        <Footer />
        <FeedbackList />
      </Container>
    </>
  );
}

export default App;
