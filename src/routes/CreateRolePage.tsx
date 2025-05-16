import React, { useState } from 'react';
import { secureFetch } from '../lib/secureFetch';



export default function CreateRolePage() {
  const [roleName, setRoleName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!roleName.trim()) {
        alert('Rol adı boş olamaz.');
        return;
    }

    try {
      const res = await secureFetch('/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: roleName }),
      });

        const data = await res.json();

        if (res.status === 409) {
        // 🔁 Bu durumda zaten var olan bir rol var demektir
        alert('❗ Bu isimde bir rol zaten var.');
        return;
        }

        if (!res.ok) {
        alert(data.message || 'Bilinmeyen bir hata oluştu');
        return;
        }

        setMessage(`✅ Rol "${roleName}" başarıyla oluşturuldu.`);
        setRoleName('');
    } catch (err) {
        alert('❌ Sunucuya ulaşılamadı.');
        console.error(err);
    }
    };


  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: 'auto' }}>
      <h2>Yeni Rol Oluştur</h2>
      <input
        placeholder="Rol adı (örnek: user)"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={handleSubmit}>Ekle</button>

      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
    </div>
  );
}
