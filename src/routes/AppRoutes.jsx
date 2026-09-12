import { Routes, Route } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import HomePage from '../pages/HomePage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';

// Application routing:
// "/"       -> HomePage (Navbar + Footer shell)
// "/signup" -> SignupPage (full-bleed auth layout, no Navbar/Footer)
// "/login"  -> LoginPage (full-bleed auth layout, no Navbar/Footer)
// "*"       -> NotFoundPage (Navbar + Footer shell)
//
// Signup/Login are intentionally outside the AppLayout route group:
// the approved design is a full-screen split layout with its own
// branding panel and footer text, not the site chrome. Paths are
// unchanged - only the layout wrapper differs.
function AppRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
