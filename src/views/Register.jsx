// src/views/Register.jsx
import React, { useState } from 'react';
import InputField from '../ui/InputField';
import { registerUser } from '../services/api'; // <--- 1. Import fungsi registerUser dari api.js

function Register({ onNavigate }) {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [nohp, setNohp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // <--- State untuk indikator loading tombol

  // 2. Ubah handleRegister menjadi async
  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Kata sandi dan konfirmasi kata sandi tidak sesuai!');
      return;
    }

    setIsLoading(true);

    try {
      // 3. Susun data user sesuai kolom yang ada di MockAPI (name, email, password)
      const newUser = {
        name: nama,
        email: email,
        password: password,
        phone: nohp // opsional jika ingin disimpan
      };

      // 4. Kirim data ke MockAPI menggunakan registerUser
      const result = await registerUser(newUser);

      if (result) {
        alert('Pendaftaran Berhasil! Akun Anda telah tersimpan di server. Menuju ke halaman Login...');
        onNavigate('login'); // Setelah daftar sukses, diarahkan ke halaman login
      } else {
        alert('Pendaftaran gagal, silakan coba lagi.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat register:', error);
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
        
        <h3>Buat Akun Baru</h3>
        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>Mulai perjalanan belajarmu hari ini</p>
        
        <form onSubmit={handleRegister}>
          <InputField label="Nama Lengkap" id="nama" placeholder="Masukkan nama lengkap Anda" required value={nama} onChange={(e) => setNama(e.target.value)} />
          <InputField label="E-mail" type="email" id="email" placeholder="Masukkan email Anda" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField label="Nomor HP" type="tel" id="nohp" placeholder="Masukkan nomor HP Anda" required value={nohp} onChange={(e) => setNohp(e.target.value)} />
          <InputField label="Kata Sandi" type="password" id="password" placeholder="Masukkan kata sandi" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <InputField label="Konfirmasi Kata Sandi" type="password" id="confirm-password" placeholder="Masukkan ulang kata sandi" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '15px' }} disabled={isLoading}>
            {isLoading ? 'Mendaftarkan...' : 'Daftar'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => onNavigate('login')}>Sudah Punya Akun? Masuk</button>
        </form>
      </div>
    </div>
  );
}

export default Register;