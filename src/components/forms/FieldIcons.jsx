// Minimal inline SVG icons used by auth forms.
// Kept dependency-free (no icon library) and intentionally simple.

function baseProps(props) {
  return {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    ...props,
  };
}

export function UserIcon(props) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
    </svg>
  );
}

export function MailIcon(props) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg {...baseProps(props)}>
      <path d="M6 3h3l1.5 4.5L8 9.5a12 12 0 0 0 6.5 6.5l2-2.5L21 15v3a2 2 0 0 1-2 2C11.3 20 4 12.7 4 5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function LockIcon(props) {
  return (
    <svg {...baseProps(props)}>
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function EyeIcon(props) {
  return (
    <svg {...baseProps(props)}>
      <path d="M2 12c2.5-5 6.5-8 10-8s7.5 3 10 8c-2.5 5-6.5 8-10 8s-7.5-3-10-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function EyeOffIcon(props) {
  return (
    <svg {...baseProps(props)}>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.2A10.9 10.9 0 0 1 12 5c3.5 0 7.5 3 10 8-.9 1.8-2 3.3-3.2 4.5M6.3 6.3C4.5 7.6 3 9.6 2 12c2.5 5 6.5 8 10 8 1.4 0 2.8-.4 4.1-1.1" />
      <path d="M9.5 9.7A3 3 0 0 0 12 15a3 3 0 0 0 2.3-1.1" />
    </svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <svg {...baseProps(props)}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg {...baseProps({ strokeWidth: 2.4, width: 12, height: 12, ...props })}>
      <path d="m4 12 5 5 11-11" />
    </svg>
  );
}
