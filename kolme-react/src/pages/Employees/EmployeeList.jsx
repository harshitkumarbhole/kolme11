import { useEffect, useState } from 'react';
import Table from '../../components/common/Table';
import FormInput from '../../components/common/FormInput';
import Modal from '../../components/common/Modal';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';
import { showToast } from '../../components/common/ToastMessage';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [current, setCurrent] = useState({ id: null, name: '', email: '', phone: '' });
  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showView, setShowView] = useState(false);

  useEffect(() => {
    // simulate API
    setTimeout(() => {
      try {
        setEmployees([
          { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '1234567890' },
          { id: 2, name: 'Bob Smith', email: 'bob@example.com', phone: '9876543210' },
        ]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load');
        setLoading(false);
      }
    }, 300);
  }, []);

  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openAdd = () => {
    setCurrent({ id: null, name: '', email: '', phone: '' });
    setShowForm(true);
  };
  const openEdit = (emp) => {
    setCurrent(emp);
    setShowForm(true);
  };
  const saveEmployee = () => {
    if (current.id) {
      setEmployees((prev) => prev.map((e) => (e.id === current.id ? current : e)));
      showToast('Employee updated', 'success');
    } else {
      setEmployees((prev) => [...prev, { ...current, id: Date.now() }]);
      showToast('Employee added', 'success');
    }
    setShowForm(false);
  };
  const confirmDelete = (emp) => {
    setCurrent(emp);
    setShowDelete(true);
  };
  const deleteEmployee = () => {
    setEmployees((prev) => prev.filter((e) => e.id !== current.id));
    setShowDelete(false);
    showToast('Employee deleted', 'info');
  };

  const columns = [
    { key: 'name', label: 'Name', info: 'Employee full name' },
    { key: 'email', label: 'Email', info: 'Email address' },
    { key: 'phone', label: 'Phone', info: '10 digit phone number' },
  ];

  if (loading) return <Spinner />;
  if (error) return (
    <div className="alert alert-danger" role="alert">
      {error}
      <Button
        variant="light"
        size="sm"
        className="ms-2"
        onClick={() => window.location.reload()}
        aria-label="Retry"
      >
        Retry
      </Button>
    </div>
  );
  if (!employees.length)
    return (
      <div className="text-center py-5">
        <i className="bi bi-people display-6 d-block mb-3" aria-hidden="true"></i>
        <p>No employees found</p>
        <Button variant="primary" onClick={openAdd} aria-label="Add Employee" icon="plus-lg">
          Add
        </Button>
      </div>
    );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center my-4 border-bottom pb-2">
        <h1 className="mb-0">Employees</h1>
        <Button variant="primary" onClick={openAdd} aria-label="Add Employee" icon="plus-lg">
          Add
        </Button>
      </div>
      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-search" aria-hidden="true"></i></span>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search employees"
          />
        </div>
      </div>
      <Table
        columns={columns}
        data={paginated}
        className="table-card"
        actions={(e) => (
          <>
            <Button
              size="sm"
              variant="secondary"
              className="me-1"
              onClick={() => {
                setCurrent(e);
                setShowView(true);
              }}
              aria-label="View"
              icon="eye"
            />
            <Button
              size="sm"
              variant="primary"
              className="me-1"
              onClick={() => openEdit(e)}
              aria-label="Edit"
              icon="pencil"
            />
            <Button
              size="sm"
              variant="danger"
              onClick={() => confirmDelete(e)}
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

      <Modal
        show={showForm}
        title={current.id ? 'Edit Employee' : 'Add Employee'}
        onClose={() => setShowForm(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowForm(false)} aria-label="Cancel">
              Cancel
            </Button>
            <Button variant="primary" onClick={saveEmployee} aria-label="Save" className="ms-2">
              Save
            </Button>
          </>
        }
      >
        <FormInput label="Name" icon="person" value={current.name} onChange={(v) => setCurrent({ ...current, name: v })} required />
        <FormInput label="Email" icon="envelope" type="email" value={current.email} onChange={(v) => setCurrent({ ...current, email: v })} required />
        <FormInput label="Phone" icon="telephone" value={current.phone} onChange={(v) => setCurrent({ ...current, phone: v })} pattern="\\d{10}" required />
      </Modal>

      <Modal
        show={showDelete}
        title="Confirm Delete"
        onClose={() => setShowDelete(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowDelete(false)} aria-label="Cancel">
              Cancel
            </Button>
            <Button variant="danger" onClick={deleteEmployee} aria-label="Confirm delete" className="ms-2">
              Delete
            </Button>
          </>
        }
      >
        Are you sure you want to delete {current.name}?
      </Modal>

      <Modal show={showView} title="Employee" onClose={() => setShowView(false)}>
        <p><strong>Name:</strong> {current.name}</p>
        <p><strong>Email:</strong> {current.email}</p>
        <p><strong>Phone:</strong> {current.phone}</p>
      </Modal>
    </div>
  );
}
