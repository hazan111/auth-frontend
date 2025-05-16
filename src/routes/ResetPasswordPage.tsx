import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Yeni Şifre Belirle</h2>
      <input
        type="password"
        placeholder="Yeni şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <input
        type="password"
        placeholder="Şifreyi tekrar girin"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={handleReset}>Şifreyi Güncelle</button>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}
