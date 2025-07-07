import { useState } from 'react';

export default function FormInput({ label, icon, type = 'text', value, onChange, required, pattern, ...rest }) {
  const [touched, setTouched] = useState(false);
  const id = label.replace(/\s+/g, '-').toLowerCase();
  const valid = !required || (value && (!pattern || new RegExp(pattern).test(value)));

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <div className="input-group">
        {icon && (
          <span className="input-group-text">
            <i className={`bi bi-${icon}`} aria-hidden="true"></i>
          </span>
        )}
        <input
          id={id}
          type={type}
          className={`form-control${touched && !valid ? ' is-invalid' : ''}`}
          value={value}
          onBlur={() => setTouched(true)}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          pattern={pattern}
          aria-invalid={!valid}
          {...rest}
        />
        {touched && !valid && (
          <div className="invalid-feedback">Please enter a valid {label.toLowerCase()}.</div>
        )}
      </div>
    </div>
  );
}
