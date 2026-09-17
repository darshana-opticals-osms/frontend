import logo from '../../assets/darshana-logo.jpg';
import { CheckIcon } from '../forms/FieldIcons';
import './AuthBrandPanel.css';

// Decorative branding panel shown alongside the Signup / Login forms.
// Purely presentational - no state, no navigation, no form logic.
//
// `sectionHeading` is optional small-caps text shown above the feature
// list (e.g. "Why Join Us?" on the signup page). Each feature may supply
// its own `icon` component; features without one fall back to CheckIcon.
function AuthBrandPanel({ features, sectionHeading }) {
  return (
    <aside className="auth-brand-panel" aria-hidden="true">
      <span className="auth-brand-panel__decor auth-brand-panel__decor--top" />
      <span className="auth-brand-panel__decor auth-brand-panel__decor--bottom" />

      <div className="auth-brand-panel__content">
        <img src={logo} alt="" className="auth-brand-panel__logo" />
        <h2 className="auth-brand-panel__title">Darshana Opticals</h2>
        <p className="auth-brand-panel__subtitle">(PVT) LTD.</p>

        {sectionHeading ? (
          <p className="auth-brand-panel__section-heading">{sectionHeading}</p>
        ) : null}

        <ul className="auth-brand-panel__features">
          {features.map((feature) => {
            const FeatureIcon = feature.icon || CheckIcon;
            return (
              <li key={feature.primary} className="auth-brand-panel__feature">
                <span className="auth-brand-panel__feature-icon">
                  <FeatureIcon />
                </span>
                <span className="auth-brand-panel__feature-text">
                  <span className="auth-brand-panel__feature-primary">
                    {feature.primary}
                  </span>
                  {feature.secondary ? (
                    <span className="auth-brand-panel__feature-secondary">
                      {feature.secondary}
                    </span>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default AuthBrandPanel;
