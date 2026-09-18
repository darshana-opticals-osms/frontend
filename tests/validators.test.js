import {
  isRequired,
  isValidEmail,
  isValidPhone,
  isValidPasswordLength,
  passwordsMatch,
} from '../src/utils/validators';

describe('isRequired', () => {
  it('returns false for empty or whitespace-only strings', () => {
    expect(isRequired('')).toBe(false);
    expect(isRequired('   ')).toBe(false);
  });

  it('returns true for non-empty strings', () => {
    expect(isRequired('Jane Doe')).toBe(true);
  });
});

describe('isValidEmail', () => {
  it('rejects malformed email addresses', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('missing@domain')).toBe(false);
    expect(isValidEmail('@missing-local.com')).toBe(false);
  });

  it('accepts well-formed email addresses', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });
});

describe('isValidPhone', () => {
  it('rejects strings that are too short or contain letters', () => {
    expect(isValidPhone('123')).toBe(false);
    expect(isValidPhone('abcdefghij')).toBe(false);
  });

  it('accepts common phone number formats', () => {
    expect(isValidPhone('+94 77 123 4567')).toBe(true);
    expect(isValidPhone('0771234567')).toBe(true);
  });
});

describe('isValidPasswordLength', () => {
  it('rejects passwords shorter than the minimum length', () => {
    expect(isValidPasswordLength('short1')).toBe(false);
  });

  it('accepts passwords meeting the minimum length', () => {
    expect(isValidPasswordLength('longenough1')).toBe(true);
  });
});

describe('passwordsMatch', () => {
  it('returns false when passwords differ', () => {
    expect(passwordsMatch('Password123', 'Password124')).toBe(false);
  });

  it('returns false when either password is empty', () => {
    expect(passwordsMatch('', '')).toBe(false);
  });

  it('returns true when both passwords are identical and non-empty', () => {
    expect(passwordsMatch('Password123', 'Password123')).toBe(true);
  });
});
