import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './auth.css';

const AuthForm = ({
  title,
  subtitle,
  fields,
  values,
  onChange,
  onSubmit,
  isLoading,
  error,
  submitLabel,
  footerText,
  footerLinkText,
  footerLinkTo,
}) => {
  return (
    <div className="auth-page-shell">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="auth-copy">
          <span className="auth-badge">Skillcase</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <form className="auth-form" onSubmit={onSubmit}>
          {fields.map((field) => (
            <label className="auth-field" key={field.name}>
              <span>{field.label}</span>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={onChange}
                autoComplete={field.autoComplete}
                required
              />
            </label>
          ))}

          {error ? <div className="auth-error">{error}</div> : null}

          <button className="auth-submit" type="submit" disabled={isLoading}>
            {isLoading ? 'Please wait...' : submitLabel}
          </button>
        </form>

        <p className="auth-footer">
          {footerText} <Link to={footerLinkTo}>{footerLinkText}</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
