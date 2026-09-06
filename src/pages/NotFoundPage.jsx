import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import './NotFoundPage.css';

function NotFoundPage() {
  useDocumentTitle('Page Not Found | OSMS');

  return (
    <section className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Return to Home</Link>
    </section>
  );
}

export default NotFoundPage;
