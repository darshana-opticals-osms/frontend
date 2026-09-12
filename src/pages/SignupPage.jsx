import { useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import FormField from '../components/forms/FormField';
import AuthBrandPanel from '../components/auth/AuthBrandPanel';
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  LockIcon,
  ArrowRightIcon,
} from '../components/forms/FieldIcons';
import {
  isRequired,
  isValidEmail,
  isValidPhone,
  isValidPasswordLength,
  passwordsMatch,
  validationMessages,
} from '../utils/validators';
import '../styles/authShell.css';
import './SignupPage.css';

const initialFormState = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

// Decorative marketing copy for the branding panel - no functionality.
const SIGNUP_FEATURES = [
  { primary: 'Order History', secondary: 'Track all your past purchases' },
  { primary: 'Exclusive Deals', secondary: 'Member-only discounts & offers' },
  {
    primary: 'Saved Prescriptions',
    secondary: 'Store your lens prescriptions',
  },
  { primary: 'Wishlist', secondary: 'Save your favourite frames' },
];

// Validates the signup form and returns a map of field -> error message.
// A field with no error is simply absent from the returned object.
function validateSignupForm(values) {
  const errors = {};

  if (!isRequired(values.fullName)) {
    errors.fullName = validationMessages.required;
  }

  if (!isRequired(values.email)) {
    errors.email = validationMessages.required;
  } else if (!isValidEmail(values.email)) {
    errors.email = validationMessages.email;
  }

  if (!isRequired(values.phone)) {
    errors.phone = validationMessages.required;
  } else if (!isValidPhone(values.phone)) {
    errors.phone = validationMessages.phone;
  }

  if (!isRequired(values.password)) {
    errors.password = validationMessages.required;
  } else if (!isValidPasswordLength(values.password)) {
    errors.password = validationMessages.passwordLength;
  }

  if (!isRequired(values.confirmPassword)) {
    errors.confirmPassword = validationMessages.required;
  } else if (!passwordsMatch(values.password, values.confirmPassword)) {
    errors.confirmPassword = validationMessages.passwordMismatch;
  }

  return errors;
}

// Public customer registration page.
// Client-side validation only - backend integration and credential
// storage are out of scope for this issue (see DDP-012).
function SignupPage() {
  useDocumentTitle('Sign Up | Darshana Opticals');

  const [values, setValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  // Visual-only: not required, not validated, not persisted anywhere.
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  function handleChange(field) {
    return (event) => {
      setValues((previous) => ({ ...previous, [field]: event.target.value }));
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateSignupForm(values);
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
      <div className="auth-shell__form-section">
        <div className="auth-card">
          <div className="auth-card__header">
            <h1>Create account</h1>
            <p>Join Darshana Opticals today â€” it&apos;s free</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <FormField
              id="fullName"
              label="Full Name"
              value={values.fullName}
              onChange={handleChange('fullName')}
              error={errors.fullName}
              autoComplete="name"
              placeholder="Your full name"
              icon={UserIcon}
            />
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
              id="phone"
              label="Phone Number"
              type="tel"
              value={values.phone}
              onChange={handleChange('phone')}
              error={errors.phone}
              autoComplete="tel"
              placeholder="+94 77 123 4567"
              icon={PhoneIcon}
            />
            <FormField
              id="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange('password')}
              error={errors.password}
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              icon={LockIcon}
              revealable
              revealLabel="password"
            />
            <FormField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              error={errors.confirmPassword}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              icon={LockIcon}
              revealable
              revealLabel="confirmation"
            />

            <label className="auth-checkbox-row">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(event) => setAgreedToTerms(event.target.checked)}
              />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>

            <button type="submit" className="auth-submit-button">
              Create Account
              <ArrowRightIcon />
            </button>

            {submitted ? (
              <p role="status" className="signup-page__success">
                Form is valid. Account creation will be connected to the backend
                in a future update.
              </p>
            ) : null}
          </form>

          <p className="auth-card__footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>

        <p className="auth-copyright">
          &copy; {new Date().getFullYear()} Darshana Opticals (PVT) LTD. All
          rights reserved.
        </p>
      </div>

      <AuthBrandPanel features={SIGNUP_FEATURES} />
    </div>
  );
}

export default SignupPage;
