import { useEffect, useState } from 'react';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';
import FormInput from '../../components/common/FormInput';
import Spinner from '../../components/common/Spinner';
import { showToast } from '../../components/common/ToastMessage';

export default function Search() {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteEmp, setDeleteEmp] = useState(null);
  const [editEmp, setEditEmp] = useState(null);
  const [viewEmp, setViewEmp] = useState(null);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setLoading(true);
    setError(false);
    setTimeout(() => {
      try {
        const data = [
          { id: 1, firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', phone: '1234567890', location: 'NY', role: 'Admin', department: 'HR', manager: 'Bob', startDate: '2024-01-01', status: 'Active' },
          { id: 2, firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com', phone: '9876543210', location: 'NY', role: 'User', department: 'IT', manager: 'Carl', startDate: '2023-09-15', status: 'Active' },
          { id: 3, firstName: 'Carol', lastName: 'Lee', email: 'carol@example.com', phone: '5555555555', location: 'LA', role: 'User', department: 'Sales', manager: 'Dana', startDate: '2022-05-10', status: 'Inactive' },
        ];
        setEmployees(data);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  useEffect(() => {
    let data = employees;
    if (search) {
      const term = search.toLowerCase();
      data = data.filter(
        (e) => `${e.firstName} ${e.lastName}`.toLowerCase().includes(term)
      );
    }
    if (location) data = data.filter((e) => e.location === location);
    if (date) data = data.filter((e) => e.startDate === date);
    setFiltered(data);
    setPage(1);
  }, [search, location, date, employees]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email', info: 'Work email address' },
    { key: 'phone', label: 'Phone', info: 'Mobile number' },
    { key: 'location', label: 'Location' },
    { key: 'role', label: 'Role' },
    { key: 'department', label: 'Department' },
    { key: 'manager', label: 'Manager' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'status', label: 'Status' },
  ];

  if (loading) return <Spinner />;
  if (error)
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          Failed to load data
          <Button className="ms-2" variant="light" onClick={() => window.location.reload()} aria-label="Retry">
            Retry
          </Button>
        </div>
      </div>
    );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center my-4 border-bottom pb-2">
        <h1 className="mb-0">Employee Search</h1>
        <Button
          variant="primary"
          onClick={() => setEditEmp({})}
          aria-label="Add Employee"
        >
          <i className="bi bi-person-plus me-1" aria-hidden="true"></i>Add
        </Button>
      </div>
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <FormInput label="Search" icon="search" value={searchInput} onChange={setSearchInput} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Location</label>
          <select className="form-select" value={locationInput} onChange={(e) => setLocationInput(e.target.value)}>
            <option value="">All</option>
            <option value="NY">NY</option>
            <option value="LA">LA</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Start Date</label>
          <input type="date" className="form-control" value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <Button
            variant="primary"
            className="me-2"
            onClick={() => {
              setSearch(searchInput);
              setLocation(locationInput);
              setDate(dateInput);
            }}
            aria-label="Search"
          >
            Search
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setSearchInput('');
              setLocationInput('');
              setDateInput('');
              setSearch('');
              setLocation('');
              setDate('');
            }}
            aria-label="View All"
          >
            View All
          </Button>
        </div>
      </div>
      {filtered.length ? (
        <>
          <Table
            columns={columns}
            data={paginated}
            className="table-card"
            actions={(e) => (
              <>
                <Button
                  size="sm"
                  variant="info"
                  className="me-1"
                  onClick={() => setViewEmp(e)}
                  aria-label="View"
                  icon="eye"
                />
                <Button
                  size="sm"
                  variant="primary"
                  className="me-1"
                  onClick={() => setEditEmp(e)}
                  aria-label="Edit"
                  icon="pencil"
                />
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => setDeleteEmp(e)}
                  aria-label="Delete"
                  icon="trash"
                />
              </>
            )}
          />
          <nav aria-label="Page navigation" className="mt-3">
            <ul className="pagination justify-content-end">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(page - 1)} aria-label="Previous">
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(page + 1)} aria-label="Next">
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <div className="text-center my-5" aria-label="No results">
          <i className="bi bi-person-x display-1 text-muted" aria-hidden="true"></i>
          <p className="mt-3">No results</p>
        </div>
      )

      <Modal
        show={!!deleteEmp}
        title="Confirm Delete"
        onClose={() => setDeleteEmp(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteEmp(null)} aria-label="Cancel">
              Cancel
            </Button>
            <Button
              variant="danger"
              className="ms-2"
              onClick={() => {
                setEmployees((prev) => prev.filter((e) => e.id !== deleteEmp.id));
                setDeleteEmp(null);
                showToast('Employee deleted', 'info');
              }}
              aria-label="Confirm delete"
            >
              Delete
            </Button>
          </>
        }
      >
        Are you sure you want to delete {deleteEmp?.firstName} {deleteEmp?.lastName}?
      </Modal>

      <Modal
        show={!!viewEmp}
        title="Employee Details"
        onClose={() => setViewEmp(null)}
      >
        {viewEmp && (
          <ul className="list-unstyled">
            {columns.map((c) => (
              <li key={c.key} className="mb-1">
                <strong>{c.label}: </strong>
                {viewEmp[c.key]}
              </li>
            ))}
          </ul>
        )}
      </Modal>

      <Modal
        show={!!editEmp}
        title={`${editEmp && editEmp.id ? 'Edit' : 'Add'} Employee`}
        onClose={() => setEditEmp(null)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setEditEmp(null)} aria-label="Cancel">
              Cancel
            </Button>
            <Button
              variant="primary"
              className="ms-2"
              onClick={() => {
                if (editEmp.id) {
                  setEmployees((prev) => prev.map((e) => (e.id === editEmp.id ? editEmp : e)));
                } else {
                  setEmployees((prev) => [...prev, { ...editEmp, id: prev.length + 1 }]);
                }
                setEditEmp(null);
                showToast('Employee saved', 'success');
              }}
              aria-label="Save"
            >
              Save
            </Button>
          </>
        }
      >
        {editEmp && (
          <form onSubmit={(e) => e.preventDefault()}>
            <FormInput
              label="First Name"
              value={editEmp.firstName || ''}
              onChange={(v) => setEditEmp({ ...editEmp, firstName: v })}
              required
            />
            <FormInput
              label="Last Name"
              value={editEmp.lastName || ''}
              onChange={(v) => setEditEmp({ ...editEmp, lastName: v })}
              required
            />
            <FormInput
              label="Email"
              type="email"
              value={editEmp.email || ''}
              onChange={(v) => setEditEmp({ ...editEmp, email: v })}
              required
            />
          </form>
        )}
      </Modal>
    </div>
  );
}
