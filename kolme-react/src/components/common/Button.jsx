import React from 'react';

export default function Button({
  variant = 'primary',
  size,
  icon,
  children,
  className = '',
  ...props
}) {
  const sizeClass = size ? `btn-${size}` : '';
  return (
    <button className={`btn btn-${variant} ${sizeClass} rounded ${className}`} {...props}>
      {icon && <i className={`bi bi-${icon} me-1`} aria-hidden="true"></i>}
      {children}
    </button>
  );
}


