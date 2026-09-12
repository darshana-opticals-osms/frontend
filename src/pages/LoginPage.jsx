import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import FormField from '../components/forms/FormField';
import AuthBrandPanel from '../components/auth/AuthBrandPanel';
import {
  MailIcon,
  LockIcon,
  ArrowRightIcon,
} from '../components/forms/FieldIcons';
import {
  isRequired,
  isValidEmail,
  validationMessages,
} from '../utils/validators';
import '../styles/authShell.css';
import './LoginPage.css';

const initialFormState = {
  email: '',
  password: '',
};

// Decorative marketing copy for the branding panel - no functionality.
const LOGIN_FEATURES = [
  { primary: 'Premium eyewear collection' },
  { primary: 'Free professional eye tests' },
  { primary: 'Free delivery island-wide' },
  { primary: '30-day easy returns' },
];

// Validates the login form and returns a map of field -> error message.
function validateLoginForm(values) {
  const errors = {};

  if (!isRequired(values.email)) {
    errors.email = validationMessages.required;
  } else if (!isValidEmail(values.email)) {
    errors.email = validationMessages.email;
  }

  if (!isRequired(values.password)) {
    errors.password = validationMessages.required;
  }

  return errors;
}

// Public login page.
// Client-side validation only - authentication, JWT handling, and any
// persistent storage of credentials/tokens are out of scope (see DDP-012).
function LoginPage() {
  useDocumentTitle('Log In | Darshana Opticals');

  const [values, setValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  // Visual-only: not persisted anywhere (no localStorage/sessionStorage).
  const [rememberMe, setRememberMe] = useState(false);

  function handleChange(field) {
    return (event) => {
      setValues((previous) => ({ ...previous, [field]: event.target.value }));
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateLoginForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    // Form is valid. Backend/API integration is intentionally not
    // implemented here - this issue covers UI and validation only.
    setSubmitted(true);
  }

  return (
    <div className="auth-shell">
      <AuthBrandPanel features={LOGIN_FEATURES} />

      <div className="auth-shell__form-section">
        <div className="auth-card">
          <div className="auth-card__header">
            <h1>Welcome back</h1>
            <p>Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <FormField
              id="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange('email')}
              error={errors.email}
              autoComplete="email"
              placeholder="you@example.com"
              icon={MailIcon}
            />
            <FormField
              id="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange('password')}
              error={errors.password}
              autoComplete="current-password"
              placeholder="Enter your password"
              icon={LockIcon}
              revealable
            />

            <div className="auth-row-between">
              <label className="auth-checkbox-row">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                />
                <span>Remember me for 30 days</span>
              </label>
              {/* Static text, not a link: no /forgot-password route exists
                  yet and adding routes is out of scope for this issue. */}
              <span className="auth-static-link-like">Forgot password?</span>
            </div>

            <button type="submit" className="auth-submit-button">
              Sign In
              <ArrowRightIcon />
            </button>

            {submitted ? (
              <p role="status" className="login-page__success">
                Form is valid. Authentication will be connected to the backend
                in a future update.
              </p>
            ) : null}
          </form>

          <p className="auth-card__footer">
            Don&apos;t have an account?{' '}
            <Link to="/signup">Create one free</Link>
          </p>
        </div>

        <p className="auth-copyright">
          &copy; {new Date().getFullYear()} Darshana Opticals (PVT) LTD. All
          rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
