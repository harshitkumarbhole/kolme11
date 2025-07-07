import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <nav className={`bg-dark text-white sidebar ${open ? 'open' : 'collapsed'}`}>
      <button className="btn btn-dark w-100 d-md-none" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        <i className="bi bi-list"></i>
      </button>
      <ul className="nav flex-column mt-3">
        <li className="nav-item">
          <NavLink to="/" end className="nav-link text-white">
            <i className="bi bi-speedometer2 me-2"></i>Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/employees" className="nav-link text-white">
            <i className="bi bi-people me-2"></i>Employees
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/roles" className="nav-link text-white">
            <i className="bi bi-shield-lock me-2"></i>Roles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/modules" className="nav-link text-white">
            <i className="bi bi-box-seam me-2"></i>Modules
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/leave-requests" className="nav-link text-white">
            <i className="bi bi-calendar-check me-2"></i>Leave Requests
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
