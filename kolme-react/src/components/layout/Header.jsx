import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function Header() {
  const { logout } = useContext(AuthContext);
  return (
    <header className="navbar navbar-dark bg-dark text-white px-3">
      <span className="navbar-brand mb-0 h1">Kolme</span>
      <div className="ms-auto">
        <button className="btn btn-sm btn-outline-light" onClick={logout} aria-label="Logout">

          <i className="bi bi-box-arrow-right me-1" aria-hidden="true"></i>

          Logout
        </button>
      </div>
    </header>
  );
}
