import FeedbackContextProvider from "../contexts/FeedbackContextProvider";
import Container from "./Container";
import FeedbackList from "./FeedbackList";
import Footer from "./Footer";
import HashtagList from "./HashtagList";

function App() {
  // https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks

  return (
    <>
      <FeedbackContextProvider>
        <Container>
          <HashtagList />
          <FeedbackList />
          <Footer />
        </Container>
      </FeedbackContextProvider>
    </>
  );
}

export default App;
