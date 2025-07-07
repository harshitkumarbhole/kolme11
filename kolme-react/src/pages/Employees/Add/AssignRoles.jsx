import { useOutletContext } from 'react-router-dom';
import Button from '../../../components/common/Button';

const options = ['HR', 'IT', 'Sales'];

export default function AssignRoles() {
  const { employee, setEmployee, save, reset, cancel } = useOutletContext();

  const toggle = (field, value) => {
    const list = employee[field];
    setEmployee({
      ...employee,
      [field]: list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value],
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mb-3">
        <label className="form-label">Modules</label>
        {options.map((o) => (
          <div key={o} className="form-check">
            <input
              id={`m-${o}`}
              type="checkbox"
              className="form-check-input"
              checked={employee.modules.includes(o)}
              onChange={() => toggle('modules', o)}
            />
            <label htmlFor={`m-${o}`} className="form-check-label">
              {o}
            </label>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <label className="form-label">Locations</label>
        {['NY', 'LA'].map((o) => (
          <div key={o} className="form-check">
            <input
              id={`l-${o}`}
              type="checkbox"
              className="form-check-input"
              checked={employee.locations.includes(o)}
              onChange={() => toggle('locations', o)}
            />
            <label htmlFor={`l-${o}`} className="form-check-label">
              {o}
            </label>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <label className="form-label">Roles</label>
        {['Admin', 'User'].map((o) => (
          <div key={o} className="form-check">
            <input
              id={`r-${o}`}
              type="checkbox"
              className="form-check-input"
              checked={employee.roles.includes(o)}
              onChange={() => toggle('roles', o)}
            />
            <label htmlFor={`r-${o}`} className="form-check-label">
              {o}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Button variant="secondary" onClick={cancel} aria-label="Cancel" className="me-2">
          Cancel
        </Button>
        <Button variant="light" onClick={reset} aria-label="Reset" className="me-2">
          Reset
        </Button>
        <Button variant="primary" onClick={save} aria-label="Save">
          Save
        </Button>
      </div>
    </form>
  );
}
