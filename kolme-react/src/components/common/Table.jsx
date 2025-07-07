export default function Table({ columns, data, actions, className = '' }) {
  return (
    <div className="table-responsive" style={{ maxHeight: '400px' }}>
      <table className={`table table-striped table-hover ${className}`}>
        <thead className="table-light position-sticky top-0">
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col">
                {c.label}
                {c.info && (
                  <i className="bi bi-info-circle ms-1" title={c.info} aria-label={c.info}></i>
                )}
              </th>
            ))}
            {actions && <th className="text-end">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((c) => (
                <td key={c.key} title={row[c.key]} className="text-truncate">
                  {row[c.key]}
                </td>
              ))}
              {actions && <td className="text-end">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
