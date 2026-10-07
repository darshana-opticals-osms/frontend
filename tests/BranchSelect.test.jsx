import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import BranchSelect from '../src/components/common/BranchSelect';

describe('BranchSelect', () => {
  const branches = [
    {
      id: 'branch-1',
      address: '45 Peradeniya Road, Kandy',
      contactNumber: '+94 81 220 0000',
    },
    {
      id: 'branch-2',
      address: '100 Galle Road, Colombo 03',
      contactNumber: '+94 11 250 0000',
    },
  ];

  it('announces loading accessibly without a label for a missing control', () => {
    render(
      <BranchSelect
        label="Branch"
        value=""
        branches={[]}
        loading
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole('status')).toHaveTextContent('Loading branches...');
    expect(screen.getByRole('status')).toHaveTextContent('Branch');
    expect(screen.queryByLabelText('Branch')).not.toBeInTheDocument();
  });

  it('renders the authoritatively returned branch options and visible branch labels', () => {
    render(
      <BranchSelect
        label="Branch"
        value=""
        branches={branches}
        loading={false}
        onChange={() => {}}
      />,
    );

    expect(screen.getByLabelText('Branch')).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: '45 Peradeniya Road, Kandy' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: '100 Galle Road, Colombo 03' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: '45 Peradeniya Road, Kandy' }),
    ).toHaveValue('branch-1');
  });

  it('can include contact numbers when that compact display is useful', () => {
    render(
      <BranchSelect
        label="Branch"
        value=""
        branches={branches}
        loading={false}
        onChange={() => {}}
        showContactNumber
      />,
    );

    expect(
      screen.getByRole('option', {
        name: '100 Galle Road, Colombo 03 – +94 11 250 0000',
      }),
    ).toBeInTheDocument();
  });

  it('uses the authoritative backend branch id as the option value and emits it on change', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <BranchSelect
        label="Branch"
        value="branch-1"
        branches={branches}
        loading={false}
        onChange={handleChange}
      />,
    );

    const select = screen.getByLabelText('Branch');
    await user.selectOptions(select, 'branch-2');

    expect(handleChange).toHaveBeenCalledWith('branch-2');
  });

  it('supports keyboard focus through Tab navigation', async () => {
    const user = userEvent.setup();
    render(
      <>
        <BranchSelect label="Branch" value="" branches={branches} />
        <button type="button">Next field</button>
      </>,
    );

    await user.tab();
    const select = screen.getByLabelText('Branch');
    expect(select).toHaveFocus();

    await user.tab();
    expect(screen.getByRole('button', { name: 'Next field' })).toHaveFocus();
  });

  it('supports an optional blank selection when required is false', () => {
    render(
      <BranchSelect
        label="Branch"
        value=""
        branches={branches}
        loading={false}
        required={false}
        onChange={() => {}}
      />,
    );

    const select = screen.getByLabelText('Branch');
    expect(select).not.toBeRequired();
    expect(
      screen.getByRole('option', { name: 'Select a branch' }),
    ).toBeInTheDocument();
  });

  it('supports required selection with native required semantics', () => {
    render(
      <BranchSelect
        label="Branch"
        value=""
        branches={branches}
        loading={false}
        required
        onChange={() => {}}
      />,
    );

    expect(screen.getByLabelText('Branch')).toBeRequired();
  });

  it('announces the empty state and runs the accessible error retry action', async () => {
    const user = userEvent.setup();
    const retry = vi.fn();

    const { rerender } = render(
      <BranchSelect
        label="Branch"
        value=""
        branches={[]}
        loading={false}
        onChange={() => {}}
      />,
    );

    expect(screen.getByText('No branches available.')).toBeInTheDocument();
    expect(
      screen
        .getByText('No branches available.')
        .closest('[aria-live="polite"]'),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText('Branch')).not.toBeInTheDocument();

    rerender(
      <BranchSelect
        label="Branch"
        value=""
        branches={[]}
        loading={false}
        error="We could not load branches. Please try again."
        onRetry={retry}
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'We could not load branches. Please try again.',
    );
    expect(screen.queryByLabelText('Branch')).not.toBeInTheDocument();
    const retryButton = screen.getByRole('button', { name: 'Retry' });
    expect(retryButton).toBeInTheDocument();
    await user.click(retryButton);
    expect(retry).toHaveBeenCalledOnce();
  });

  it('associates field validation feedback without marking loading errors invalid', () => {
    const { rerender } = render(
      <BranchSelect
        label="Branch"
        value="branch-1"
        branches={branches}
        validationError="Choose a branch."
      />,
    );

    const select = screen.getByLabelText('Branch');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAttribute(
      'aria-describedby',
      'branch-select-validation-error',
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Choose a branch.');

    rerender(
      <BranchSelect
        label="Branch"
        branches={[]}
        error="Branch lookup failed."
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Branch lookup failed.',
    );
    expect(screen.queryByLabelText('Branch')).not.toBeInTheDocument();
  });

  it('renders a disabled selector when disabled is true', () => {
    render(
      <BranchSelect
        label="Branch"
        value="branch-1"
        branches={branches}
        loading={false}
        disabled
        onChange={() => {}}
      />,
    );

    expect(screen.getByLabelText('Branch')).toBeDisabled();
  });

  it('does not expose raw ObjectId input or fake branch names', () => {
    render(
      <BranchSelect
        label="Branch"
        value=""
        branches={branches}
        loading={false}
        onChange={() => {}}
      />,
    );

    const select = screen.getByLabelText('Branch');
    expect(select).not.toHaveAttribute('type', 'text');
    expect(
      screen.queryByRole('option', {
        name: /main branch|branch 1|colombo branch/i,
      }),
    ).not.toBeInTheDocument();
  });

  it('renders fallback labels for incomplete branch records', () => {
    render(
      <BranchSelect
        label="Branch"
        value=""
        branches={[
          null,
          { id: '', address: 'No ID Road' },
          { address: 'No ID Avenue', contactNumber: '+94 11 111 1111' },
          { id: 'branch-3', contactNumber: '+94 81 555 1234' },
        ]}
        loading={false}
        showContactNumber
        onChange={() => {}}
      />,
    );

    expect(
      screen.getByRole('option', {
        name: 'Unknown address – +94 81 555 1234',
      }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('option', { name: 'No ID Road' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('option', { name: /No ID Avenue/ }),
    ).not.toBeInTheDocument();
    expect(
      within(screen.getByLabelText('Branch')).getAllByRole('option'),
    ).toHaveLength(2);
  });
});
