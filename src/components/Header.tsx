import FeedbackForm from "./FeedbackForm";

function Header() {
  return (
    <header>
      <a href="/" className="logo">
        Comment<span>Sharing</span>
      </a>
      <h2 className="feedback-header">
        Give Feedback. <span>Publicly.</span>
      </h2>
      <FeedbackForm />
    </header>
  );
}

export default Header;
