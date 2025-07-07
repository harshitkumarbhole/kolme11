import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import FormInput from '../components/common/FormInput';
import Spinner from '../components/common/Spinner';
import Button from '../components/common/Button';
import { showToast } from '../components/common/ToastMessage';
import api from '../api';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/login', { email, password });
      login(res.data.token);
      navigate('/');
    } catch (err) {
      showToast('Invalid credentials', 'error');
    }
    setLoading(false);
  };

  const valid = email && password;

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <form className="card p-4" onSubmit={handleSubmit} style={{ minWidth: '320px' }}>
        <h1 className="h4 mb-3 text-center">Login</h1>
        <FormInput
          label="Email"
          icon="envelope"
          type="email"
          value={email}
          onChange={setEmail}
          required
          autoFocus
        />
        <FormInput
          label="Password"
          icon="lock"
          type="password"
          value={password}
          onChange={setPassword}
          required
          pattern=".{6,}"
        />
        <Button
          type="submit"
          className="w-100"
          variant="primary"
          icon="box-arrow-in-right"
          disabled={!valid || loading}
          aria-label="Login"
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        {loading && <Spinner />}
      </form>
    </div>
  );
}
