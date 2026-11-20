import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '@/firebase/auth';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await loginAdmin(email, password);
      navigate('/admin');
    } catch {
      setError('Wrong email or password. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center bg-brand-dark px-3" style={{ minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} className="w-100 bg-brand-ivory rounded-4 shadow-lg p-4 p-md-5" style={{ maxWidth: '24rem' }}>
        <h1 className="font-display fw-semibold fs-3 text-brand-dark mb-1">Admin login</h1>
        <p className="text-black-50 small mb-4">Manage fabrics, clothes, and prices.</p>

        <div className="mb-3">
          <label className="form-label fw-medium small">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium small">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>

        {error && <p className="text-danger small mb-3">{error}</p>}

        <button type="submit" disabled={loading} className="btn btn-brand-dark w-100 rounded-pill fw-semibold">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
