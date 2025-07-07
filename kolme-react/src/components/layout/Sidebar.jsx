import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <nav className={`bg-dark text-white sidebar ${open ? 'open' : 'collapsed'}`} aria-label="Sidebar navigation">
      <button
        className="btn btn-dark w-100 d-md-none"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        <i className="bi bi-list" aria-hidden="true"></i>
      </button>
      <ul className="nav flex-column mt-3">
        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link text-white">
            <i className="bi bi-speedometer2 me-2" aria-hidden="true"></i>Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/employees/search" className="nav-link text-white">
            <i className="bi bi-search me-2" aria-hidden="true"></i>Search Employees
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/employees/add" className="nav-link text-white">
            <i className="bi bi-person-plus me-2" aria-hidden="true"></i>Add Employee
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/roles" className="nav-link text-white">
            <i className="bi bi-shield-lock me-2" aria-hidden="true"></i>Roles
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/modules" className="nav-link text-white">
            <i className="bi bi-collection me-2" aria-hidden="true"></i>Modules
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/leave-requests" className="nav-link text-white">
            <i className="bi bi-calendar-check me-2" aria-hidden="true"></i>Leave Requests
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
