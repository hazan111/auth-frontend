import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { secureFetch } from '../lib/secureFetch';

export default function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
}: {
  children: React.ReactNode;
  requiredRole?: string;
  requiredPermission?: string;
}) {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    secureFetch('/auth/me')
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const data = await res.json();

        if (requiredRole && data.user.role !== requiredRole) {
          navigate('/unauthorized');
          return;
        }

        if (
          requiredPermission &&
          (!data.user.permissions || !data.user.permissions.includes(requiredPermission))
        ) {
          navigate('/unauthorized');
          return;
        }

        setAuthorized(true);
      })
      .catch(() => {
        navigate('/login');
      })
      .finally(() => setChecking(false));
  }, [navigate, requiredRole, requiredPermission]);

  if (checking) return <p>Yükleniyor...</p>;
  if (!authorized) return null;

  return <>{children}</>;
}
