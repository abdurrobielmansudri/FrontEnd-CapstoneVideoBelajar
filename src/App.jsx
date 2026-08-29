// src/App.jsx
import React, { useState } from 'react';
import './style.css'; // Memanggil file CSS murni milikmu

// Memanggil (Import) ketiga halaman yang sudah kamu buat sebelumnya
import Login from './views/Login';
import Register from './views/Register';
import Beranda from './views/Beranda';

function App() {
  // State untuk melacak halaman mana yang sedang aktif (default: 'login')
  const [currentPage, setCurrentPage] = useState('login');

  // Fungsi sederhana untuk mengubah halaman aktif
  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  };

  // Logika Pengkondisian (Conditional Rendering) untuk menampilkan halaman
  return (
    <div className="app-root">
      {currentPage === 'login' && <Login onNavigate={navigateTo} />}
      {currentPage === 'register' && <Register onNavigate={navigateTo} />}
      {currentPage === 'beranda' && <Beranda onNavigate={navigateTo} />}
    </div>
  );
}

export default App;