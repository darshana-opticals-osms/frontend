import useDocumentTitle from '../hooks/useDocumentTitle';
import './HomePage.css';

// Basic OSMS frontend shell for the home route.
// Full UI implementation is out of scope for this issue.
function HomePage() {
  useDocumentTitle('Darshana Opticals | OSMS');

  return (
    <section className="home-page">
      <h1>Darshana Opticals</h1>
      <p>Optical Shop Management System</p>
      <p className="home-page__notice">
        This is the base application shell. Feature pages will be added in
        upcoming issues.
      </p>
    </section>
  );
}

export default HomePage;
