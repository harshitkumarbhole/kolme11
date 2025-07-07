
import Button from '../components/common/Button';

export default function Dashboard() {
  const cards = [
    { id: 1, title: 'Employees', value: 42, icon: 'people-fill', color: 'primary' },
    { id: 2, title: 'Active Projects', value: 8, icon: 'check-circle', color: 'success' },
    { id: 3, title: 'Pending Requests', value: 3, icon: 'exclamation-circle', color: 'warning' },
    { id: 4, title: 'Errors', value: 1, icon: 'x-circle', color: 'danger' },
  ];


  return (
    <div className="container-fluid">
      <h1 className="my-4 border-bottom pb-2">Dashboard</h1>
      <div className="row g-3">

        {cards.map((card) => (
          <div key={card.id} className="col-6 col-md-3">
            <div className={`card text-white bg-${card.color}`}>
              <div className="card-body d-flex align-items-center">
                <i className={`bi bi-${card.icon} display-6 me-3`} aria-hidden="true" />
                <div>
                  <h2 className="h6 mb-1">{card.title}</h2>
                  <p className="h4 mb-0" aria-label={`${card.title} count`}>{card.value}</p>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
