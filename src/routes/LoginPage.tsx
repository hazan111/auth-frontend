import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API = process.env.VITE_API_URL || 'http://localhost:3000';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Giriş başarısız');
        return;
      }

      // 🔄 Giriş başarılı, şimdi me bilgisi al
      const meRes = await fetch(`${API}/auth/me`, {
        credentials: 'include',
      });

      const meData = await meRes.json();
      const role = meData.user?.role;

      // ✅ Rol kontrolü
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }

    } catch (err) {
      console.error('Login error:', err);
      setMessage('Sunucu hatası');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Hesabınıza Giriş Yapın
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="E-posta"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
              required
            />
          </div>

                   {/* Login Button */}
          <button
            onClick={handleLogin}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Giriş Yap
          </button>
        </form>

        {/* Navigation Links */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            onClick={() => navigate("/reset-password")}
            className="text-sm text-blue-600 hover:underline"
          >
            Şifreyi Sıfırla
          </button>
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-blue-600 hover:underline"
          >
            Şifremi Unuttum
          </button>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-600 hover:underline"
          >
            Ana Sayfaya Dön
          </button>
        </div>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </div>
    </div>
  );
}
