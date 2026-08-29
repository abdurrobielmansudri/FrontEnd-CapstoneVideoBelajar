// src/views/Login.jsx
import React, { useState } from 'react';
import InputField from '../ui/InputField';
import { loginUser } from '../services/api'; // <--- 1. Import fungsi loginUser dari api.js

function Login({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // <--- Tambahan state loading agar interaktif

  // 2. Ubah handleLogin menjadi async karena mengambil data dari API
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Memanggil fungsi loginUser dari api.js untuk mencocokkan data ke MockAPI
      const user = await loginUser(email, password);

      if (user) {
        alert(`Login Berhasil! Selamat datang, ${user.name || 'User'}.`);
        onNavigate('beranda'); // Jika ditemukan/cocok, pindah ke halaman Beranda
      } else {
        alert('Email atau kata sandi salah! (Cek kembali data di MockAPI Anda).');
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat login:', error);
      alert('Terjadi kesalahan pada server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#22c55e">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>video<span>belajar</span></h2>
        </div>
        
        <h3>Masuk ke Akun Anda</h3>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>Yuk, lanjutkan perkembangan keahlianmu hari ini</p>
        
        <form onSubmit={handleLogin}>
          <InputField 
            label="E-mail" 
            type="email" 
            id="email" 
            placeholder="Masukkan email Anda" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <InputField 
            label="Kata Sandi" 
            type="password" 
            id="password" 
            placeholder="Masukkan kata sandi Anda" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '15px' }} disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => onNavigate('register')}>Belum Punya Akun? Daftar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;