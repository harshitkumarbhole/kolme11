import { useEffect, useRef } from 'react';

export default function Modal({ show, title, children, onClose, footer }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
      const lastFocused = document.activeElement;
      const focusDialog = () => {
        const el = dialogRef.current;
        if (el) el.focus();
      };
      focusDialog();
      const handleKey = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'Tab') {
          const focusable = dialogRef.current.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
          );
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
            e.preventDefault();
            (e.shiftKey ? last : first).focus();
          }
        }
      };
      const el = dialogRef.current;
      el.addEventListener('keydown', handleKey);
      return () => {
        el.removeEventListener('keydown', handleKey);
        lastFocused && lastFocused.focus();
        document.body.classList.remove('modal-open');
      };
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true">
      <div
        className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-sm-down"
        ref={dialogRef}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modal-title">{title}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">{children}</div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
    </div>
  );
}
