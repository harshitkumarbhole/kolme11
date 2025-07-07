import { useOutletContext } from 'react-router-dom';
import FormInput from '../../../components/common/FormInput';
import Button from '../../../components/common/Button';

export default function Personal() {
  const { employee, setEmployee, save, reset, cancel } = useOutletContext();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="row g-3">
        <div className="col-md-6">
          <FormInput
            label="First Name"
            icon="person"
            value={employee.firstName}
            onChange={(v) => setEmployee({ ...employee, firstName: v })}
            required
          />
        </div>
        <div className="col-md-6">
          <FormInput
            label="Last Name"
            icon="person"
            value={employee.lastName}
            onChange={(v) => setEmployee({ ...employee, lastName: v })}
            required
          />
        </div>
        <div className="col-md-6">
          <FormInput
            label="Email"
            icon="envelope"
            type="email"
            value={employee.email}
            onChange={(v) => setEmployee({ ...employee, email: v })}
            required
          />
        </div>
        <div className="col-md-6">
          <FormInput
            label="Phone"
            icon="telephone"
            value={employee.phone}
            onChange={(v) => setEmployee({ ...employee, phone: v })}
            pattern="\\d{10}"
            required
          />
        </div>
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
