// src/App.jsx
import React, { useState } from 'react';
import './style.css'; // Memanggil file CSS murni milikmu

// Memanggil (Import) halaman-halaman yang ada
import Beranda from './views/Beranda';
import DetailProduk from './views/DetailProduk';
import Login from './views/Login';
import MetodePembayaran from './views/MetodePembayaran';
import PesananSaya from './views/PesananSaya';
import Register from './views/Register';
import SemuaProduk from './views/SemuaProduk'; // <-- 1. Import halaman SemuaProduk
import SuksesPembayaran from './views/SuksesPembayaran';
import ProfilSaya from './views/ProfilSaya';
import KelasSaya from './views/KelasSaya';
import BelajarKelas from './views/BelajarKelas';
import Pretest from './views/Pretest';

function App() {
  // State untuk melacak halaman mana yang sedang aktif (default: 'login')
  const [currentPage, setCurrentPage] = useState('login');
  // State untuk menyimpan ID produk yang sedang dipilih user
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Fungsi untuk mengubah halaman aktif, bisa bawa data tambahan (payload)
  const navigateTo = (pageName, payload) => {
    setCurrentPage(pageName);
    if (payload) setSelectedCourseId(payload);
  };

  // Logika Pengkondisian (Conditional Rendering) untuk menampilkan halaman
  return (
    <div className="app-root">
      {currentPage === 'login' && <Login onNavigate={navigateTo} />}
      {currentPage === 'register' && <Register onNavigate={navigateTo} />}
      {currentPage === 'beranda' && <Beranda onNavigate={navigateTo} />}
      {currentPage === 'semua-produk' && <SemuaProduk onNavigate={navigateTo} />} {/* <-- 2. Render halaman SemuaProduk */}
      {currentPage === 'detail-produk' && <DetailProduk onNavigate={navigateTo} courseId={selectedCourseId} />}
      {currentPage === 'metode-pembayaran' && <MetodePembayaran onNavigate={navigateTo} courseId={selectedCourseId}/>}
      {currentPage === 'sukses-pembayaran' && <SuksesPembayaran onNavigate={navigateTo}/>}
      {currentPage === 'pesanan-saya' && <PesananSaya onNavigate={navigateTo}/>}
      {currentPage === 'profil-saya' && <ProfilSaya onNavigate={navigateTo}/>}
      {currentPage === 'kelas-saya' && <KelasSaya onNavigate={navigateTo}/>}
      {currentPage === 'belajar-kelas' && <BelajarKelas onNavigate={navigateTo}/>}
      {currentPage === 'pretest' && <Pretest onNavigate={navigateTo}/>}

    </div>
  );
}

export default App;