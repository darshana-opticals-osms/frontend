import './Footer.css';

// Placeholder footer for the OSMS application shell.
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {year} Darshana Opticals. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
