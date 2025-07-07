export default function Dashboard() {
  const cards = [
    { color: 'success', icon: 'check-circle', title: 'Approved', value: 12 },
    { color: 'warning', icon: 'exclamation-triangle', title: 'Pending', value: 5 },
    { color: 'danger', icon: 'x-circle', title: 'Rejected', value: 2 },
  ];
  return (
    <div className="container-fluid">
      <h1 className="my-4 border-bottom pb-2">Dashboard</h1>
      <div className="row g-3">
        {cards.map((c) => (
          <div key={c.title} className="col-12 col-md-4">
            <div className={`card text-white bg-${c.color}`}>
              <div className="card-body d-flex align-items-center">
                <i className={`bi bi-${c.icon} display-6 me-3`}></i>
                <div>
                  <h5 className="card-title mb-0">{c.title}</h5>
                  <p className="card-text fs-4">{c.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
