import './BranchSelect.css';

function buildOptionLabel(branch, { showContactNumber = false } = {}) {
  if (!branch) {
    return 'Unknown branch';
  }

  const address = branch.address || 'Unknown address';

  if (showContactNumber && branch.contactNumber) {
    return `${address} – ${branch.contactNumber}`;
  }

  return address;
}

function BranchSelect({
  id = 'branch-select',
  label = 'Branch',
  value = '',
  branches = [],
  loading = false,
  error = '',
  onChange,
  onRetry,
  required = false,
  disabled = false,
  placeholder = 'Select a branch',
  showContactNumber = false,
  name,
}) {
  const normalizedBranches = Array.isArray(branches) ? branches : [];

  if (loading) {
    return (
      <div
        className="branch-select branch-select--loading"
        role="status"
        aria-live="polite"
      >
        <label htmlFor={id} className="branch-select__label">
          {label}
        </label>
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
        <label htmlFor={id} className="branch-select__label">
          {label}
        </label>
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
        <label htmlFor={id} className="branch-select__label">
          {label}
        </label>
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
        aria-invalid={Boolean(error)}
      >
        <option value="">{placeholder}</option>

        {normalizedBranches.map((branch, index) => {
          const optionValue = branch?.id ?? '';

          return (
            <option
              key={optionValue || `branch-option-${index}`}
              value={optionValue}
            >
              {buildOptionLabel(branch, { showContactNumber })}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default BranchSelect;
