import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import type { User } from 'firebase/auth';
import { watchAuthState } from '@/firebase/auth';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = watchAuthState((u) => {
      setUser(u);
      setChecked(true);
    });
    return unsubscribe;
  }, []);

  if (!checked) {
    return (
      <div className="d-flex align-items-center justify-content-center bg-brand-dark text-white" style={{ minHeight: '100vh' }}>
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
