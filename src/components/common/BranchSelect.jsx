import './BranchSelect.css';

function buildOptionLabel(branch, { showContactNumber = false } = {}) {
  // Keep fallback display handling defensive; options still require an ID.
  if (!branch) {
    return 'Unknown branch';
  }

  const address = branch.address || 'Unknown address';

  if (showContactNumber && branch.contactNumber) {
    return `${address} – ${branch.contactNumber}`;
  }

  return address;
}

/** Native Branch selector; the submitted field name defaults to `id`. */
function BranchSelect({
  id = 'branch-select',
  label = 'Branch',
  value = '',
  branches = [],
  loading = false,
  error = null,
  validationError = null,
  onChange,
  onRetry,
  required = false,
  disabled = false,
  placeholder = 'Select a branch',
  showContactNumber = false,
  name,
}) {
  const normalizedBranches = Array.isArray(branches)
    ? branches.filter(
        (branch) => typeof branch?.id === 'string' && branch.id.trim(),
      )
    : [];

  if (loading) {
    return (
      <div
        className="branch-select branch-select--loading"
        role="status"
        aria-live="polite"
      >
        <span className="branch-select__label">{label}</span>
        <div className="branch-select__state">Loading branches...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="branch-select branch-select--error"
        role="alert"
        aria-live="assertive"
      >
        <span className="branch-select__label">{label}</span>
        <p className="branch-select__message">{error}</p>
        {onRetry ? (
          <button
            type="button"
            className="branch-select__retry"
            onClick={onRetry}
          >
            Retry
          </button>
        ) : null}
      </div>
    );
  }

  if (!normalizedBranches.length) {
    return (
      <div className="branch-select branch-select--empty" aria-live="polite">
        <span className="branch-select__label">{label}</span>
        <p className="branch-select__message">No branches available.</p>
      </div>
    );
  }

  return (
    <div className="branch-select">
      <label htmlFor={id} className="branch-select__label">
        {label}
      </label>

      <select
        id={id}
        name={name || id}
        className="branch-select__control"
        value={value || ''}
        onChange={(event) => onChange?.(event.target.value)}
        required={required}
        disabled={disabled}
        aria-invalid={Boolean(validationError)}
        aria-describedby={
          validationError ? `${id}-validation-error` : undefined
        }
      >
        <option value="">{placeholder}</option>

        {normalizedBranches.map((branch, index) => {
          return (
            <option key={`${branch.id}-${index}`} value={branch.id}>
              {buildOptionLabel(branch, { showContactNumber })}
            </option>
          );
        })}
      </select>
      {validationError ? (
        <p
          id={`${id}-validation-error`}
          className="branch-select__message branch-select__message--error"
          role="alert"
        >
          {validationError}
        </p>
      ) : null}
    </div>
  );
}

export default BranchSelect;
