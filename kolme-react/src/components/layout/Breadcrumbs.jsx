import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);
  const crumbs = parts.map((part, idx) => {
    const path = '/' + parts.slice(0, idx + 1).join('/');
    const label = part.replace('-', ' ');
    return { path, label };
  });

  return (
    <nav aria-label="breadcrumb" className="bg-light px-3 py-2 border-bottom">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={c.path} className={`breadcrumb-item ${i === crumbs.length - 1 ? 'active' : ''}`} aria-current={i === crumbs.length - 1 ? 'page' : undefined}>
            {i === crumbs.length - 1 ? c.label : <Link to={c.path}>{c.label}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
