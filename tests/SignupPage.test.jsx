import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SignupPage from '../src/pages/SignupPage';

function renderSignupPage() {
  return render(
    <MemoryRouter>
      <SignupPage />
    </MemoryRouter>,
  );
}

describe('SignupPage', () => {
  it('renders all required registration fields', () => {
    renderSignupPage();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create account/i }),
    ).toBeInTheDocument();
  });

  it('masks password and confirm password fields by default', () => {
    renderSignupPage();

    expect(screen.getByLabelText(/^password$/i)).toHaveAttribute(
      'type',
      'password',
    );
    expect(screen.getByLabelText(/confirm password/i)).toHaveAttribute(
      'type',
      'password',
    );
  });

  it('shows validation errors and blocks submission when required fields are empty', async () => {
    const user = userEvent.setup();
    renderSignupPage();

    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(
      await screen.findAllByText(/this field is required/i),
    ).not.toHaveLength(0);
    expect(
      screen.queryByRole('status', { name: /form is valid/i }),
    ).not.toBeInTheDocument();
  });

  it('rejects an invalid email format', async () => {
    const user = userEvent.setup();
    renderSignupPage();

    await user.type(screen.getByLabelText(/^email$/i), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(
      await screen.findByText(/enter a valid email address/i),
    ).toBeInTheDocument();
  });

  it('detects a password confirmation mismatch', async () => {
    const user = userEvent.setup();
    renderSignupPage();

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/^email$/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '0771234567');
    await user.type(screen.getByLabelText(/^password$/i), 'Password123');
    await user.type(
      screen.getByLabelText(/confirm password/i),
      'DifferentPass1',
    );
    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(
      await screen.findByText(/passwords do not match/i),
    ).toBeInTheDocument();
  });

  it('accepts a fully valid form and does not display field errors', async () => {
    const user = userEvent.setup();
    renderSignupPage();

    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/^email$/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '0771234567');
    await user.type(screen.getByLabelText(/^password$/i), 'Password123');
    await user.type(screen.getByLabelText(/confirm password/i), 'Password123');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(await screen.findByRole('status')).toHaveTextContent(
      /form is valid/i,
    );
    expect(
      screen.queryByText(/this field is required/i),
    ).not.toBeInTheDocument();
  });
});
