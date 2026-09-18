import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from './FieldIcons';
import './FormField.css';

// Reusable labeled input with accessible error messaging.
// Centralises the label/input/error wiring (aria-invalid,
// aria-describedby) so form pages don't have to repeat it per field.
//
// Optional extras (all purely presentational, none change the field's
// validation behaviour):
//   - `icon`: a leading icon component rendered inside the input.
//   - `revealable`: when true on a password field, adds a show/hide
//     toggle button. The field still renders as type="password" (i.e.
//     masked) by default; toggling only changes local, in-memory state.
//   - `requiredMarker`: shows a visible "*" next to the label. Defaults
//     to the `required` prop, but can be overridden independently so a
//     field can stay functionally required without a visual marker (or
//     vice versa) to match an approved design exactly.
//   - `labelExtra`: an optional node rendered at the right-hand end of
//     the label row (e.g. a "Forgot password?" link next to "Password").
function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  autoComplete,
  required = true,
  requiredMarker = required,
  labelExtra,
  placeholder,
  icon: Icon,
  revealable = false,
  revealLabel = 'password',
}) {
  const [visible, setVisible] = useState(false);
  const errorId = `${id}-error`;
  const isPassword = type === 'password';
  const effectiveType = isPassword && revealable && visible ? 'text' : type;

  const inputClassName = [
    'form-field__input',
    Icon ? 'form-field__input--with-icon' : '',
    isPassword && revealable ? 'form-field__input--with-toggle' : '',
    error ? 'form-field__input--invalid' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="form-field">
      <div className="form-field__label-row">
        <span className="form-field__label-group">
          <label htmlFor={id} className="form-field__label">
            {label}
          </label>
          {requiredMarker ? (
            <span className="form-field__required" aria-hidden="true">
              *
            </span>
          ) : null}
        </span>
        {labelExtra ? (
          <span className="form-field__label-extra">{labelExtra}</span>
        ) : null}
      </div>
      <div className="form-field__control">
        {Icon ? (
          <span className="form-field__icon" aria-hidden="true">
            <Icon />
          </span>
        ) : null}
        <input
          id={id}
          name={id}
          type={effectiveType}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={inputClassName}
        />
        {isPassword && revealable ? (
          <button
            type="button"
            className="form-field__toggle"
            onClick={() => setVisible((previous) => !previous)}
            aria-label={visible ? `Hide ${revealLabel}` : `Show ${revealLabel}`}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        ) : null}
      </div>
      {error ? (
        <p id={errorId} className="form-field__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default FormField;
