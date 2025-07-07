import { NavLink, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../components/common/Button';
import { showToast } from '../../components/common/ToastMessage';

const initial = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  modules: [],
  locations: [],
  roles: [],
};

export default function AddEmployee() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [employee, setEmployee] = useState(initial);
  const save = () => {
    showToast('Employee saved', 'success');
    navigate('/employees/search');
  };
  const reset = () => setEmployee(initial);
  const cancel = () => navigate('/employees/search');

  return (
    <div className="container-fluid">
      <h1 className="my-4 border-bottom pb-2">Add Employee</h1>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <NavLink end to="personal" className="nav-link">
            Personal
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="assign-roles" className="nav-link">
            Assign Roles
          </NavLink>
        </li>
      </ul>
      <Outlet context={{ employee, setEmployee, save, reset, cancel }} />
    </div>
  );
}
