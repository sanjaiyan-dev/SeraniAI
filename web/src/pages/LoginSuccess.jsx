import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // ✅ default import

const LoginSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    try {
      // Save token
      localStorage.setItem('token', token);

      // Decode token
      const decoded = jwt_decode(token); // ✅ correct usage
      localStorage.setItem('user', JSON.stringify(decoded));

      // Redirect based on role
      const role = decoded?.role || 'user';
      switch (role) {
        case 'admin':
          navigate('/admin/users', { replace: true });
          break;
        case 'enterprise':
          navigate('/enterprise/dashboard', { replace: true });
          break;
        default:
          navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      console.error('Invalid token:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center h-screen text-center text-lg font-semibold">
      Logging in, please wait...
    </div>
  );
};

export default LoginSuccess;