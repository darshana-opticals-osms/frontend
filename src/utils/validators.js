// Reusable, framework-agnostic client-side validation helpers.
// Kept pure (no DOM/React dependencies) so they can be unit tested in
// isolation and reused across any form in the app.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+\-\s()]{7,15}$/;
const MIN_PASSWORD_LENGTH = 8;

/**
 * @param {string} value
 * @returns {boolean} true when the value has non-whitespace content.
 */
export function isRequired(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * @param {string} value
 * @returns {boolean} true when the value looks like a valid email address.
 */
export function isValidEmail(value) {
  return typeof value === 'string' && EMAIL_PATTERN.test(value.trim());
}

/**
 * @param {string} value
 * @returns {boolean} true when the value looks like a valid phone number.
 */
export function isValidPhone(value) {
  return typeof value === 'string' && PHONE_PATTERN.test(value.trim());
}

/**
 * @param {string} value
 * @returns {boolean} true when the password meets the minimum length rule.
 */
export function isValidPasswordLength(value) {
  return typeof value === 'string' && value.length >= MIN_PASSWORD_LENGTH;
}

/**
 * @param {string} password
 * @param {string} confirmPassword
 * @returns {boolean} true when both values are non-empty and identical.
 */
export function passwordsMatch(password, confirmPassword) {
  return (
    typeof password === 'string' &&
    typeof confirmPassword === 'string' &&
    password.length > 0 &&
    password === confirmPassword
  );
}

export const validationMessages = {
  required: 'This field is required.',
  email: 'Enter a valid email address.',
  phone: 'Enter a valid phone number.',
  passwordLength: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
  passwordMismatch: 'Passwords do not match.',
};

export { MIN_PASSWORD_LENGTH };
