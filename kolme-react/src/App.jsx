import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import EmployeeSearch from './pages/Employees/Search';
import AddEmployee from './pages/Employees/AddEmployee';
import Dashboard from './pages/Dashboard';
import PersonalTab from './pages/Employees/Add/Personal';
import AssignRolesTab from './pages/Employees/Add/AssignRoles';
import Roles from './pages/Roles';
import Modules from './pages/Modules';
import LeaveRequests from './pages/LeaveRequests';
import ProtectedRoute from './components/common/ProtectedRoute';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees/search" element={<EmployeeSearch />} />
          <Route path="employees/add" element={<AddEmployee />}>
            <Route index element={<Navigate to="personal" replace />} />
            <Route path="personal" element={<PersonalTab />} />
            <Route path="assign-roles" element={<AssignRolesTab />} />
          </Route>
          <Route path="roles" element={<Roles />} />
          <Route path="modules" element={<Modules />} />
          <Route path="leave-requests" element={<LeaveRequests />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
