import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const API = process.env.VITE_API_URL || 'http://localhost:3000';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    if (!token) {
      setMessage('Geçersiz bağlantı.');
      return;
    }

    if (password !== confirm) {
      setMessage('Şifreler uyuşmuyor.');
      return;
    }

    try {
      const res = await fetch(`${API}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();
      setMessage(data.message || 'Bir hata oluştu.');
    } catch (err) {
      setMessage('Sunucu hatası oluştu.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Yeni Şifre Belirle
        </h2>
        {message && (
          <div
            className={`mb-4 text-center text-sm ${
              message.includes('hata') ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {message}
          </div>
        )}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleReset();
          }}
        >
          <input
            type="password"
            placeholder="Yeni şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
            required
          />
          <input
            type="password"
            placeholder="Şifreyi tekrar girin"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
            required
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            Şifreyi Güncelle
          </button>
        </form>
        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-indigo-600 hover:underline text-sm"
          >
            Girişe Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
