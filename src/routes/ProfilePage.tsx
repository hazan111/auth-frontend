import React, { useEffect, useState } from 'react';
import { secureFetch } from '../lib/secureFetch';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    secureFetch(`/auth/me`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setUser(data.user));
  }, []);

  const logout = async () => {
    await secureFetch(`/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Profil</h2>
        {user ? (
          <>
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <table className="w-full text-sm text-left text-gray-800">
                <tbody>
                  <tr className="border-b">
                    <th className="py-2 font-medium text-gray-600">Ad:</th>
                    <td className="py-2">{user.name || 'Bilinmiyor'}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="py-2 font-medium text-gray-600">E-posta:</th>
                    <td className="py-2">{user.email || 'Bilinmiyor'}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="py-2 font-medium text-gray-600">Rol:</th>
                    <td className="py-2">{user.role || 'Bilinmiyor'}</td>
                  </tr>
                  <tr>
                    <th className="py-2 font-medium text-gray-600">Kayıt Tarihi:</th>
                    <td className="py-2">{user.createdAt || 'Bilinmiyor'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={logout}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-all mb-4"
            >
              Çıkış Yap
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition-all"
            >
              ⬅️ Siteye Dön
            </button>
          </>
        ) : (
          <p className="text-center text-gray-600">Kullanıcı bilgileri yükleniyor...</p>
        )}
      </div>
    </div>
  );
}