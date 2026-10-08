// src/views/SemuaProduk.jsx
import React from "react";
import CourseCard from "../ui/CourseCard";
import { useSelector } from "react-redux";

export default function SemuaProduk({ onNavigate }) {
  // Mengambil data kursus secara dinamis dari Redux store
  const courses = useSelector((state) => state.courses.list);

  return (
    <div>
    {/* NAVBAR */}
    <header className="navbar">
      <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#22c55e">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
        </svg>
        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>video<span>belajar</span></h2>
      </div>
        <button onClick={() => onNavigate('beranda')} className="semua-back-btn">
          Kembali ke Beranda
        </button>
      </header>

      {/* KONTEN UTAMA */}
      <main className="semua-main">
        <h2 className="semua-title">Koleksi Video Pembelajaran Unggulan</h2>
        
        <div className="semua-layout">
          {/* FILTER KATEGORI (KIRI) */}
          <div className="semua-filter-box">
            <h3 className="semua-filter-title">Filter Kategori</h3>
            <ul className="semua-filter-list">
              <li className="semua-filter-item active">Semua Kelas</li>
              <li className="semua-filter-item">Pemasaran</li>
              <li className="semua-filter-item">Desain</li>
              <li className="semua-filter-item">Pengembangan Diri</li>
              <li className="semua-filter-item">Business & Tech</li>
            </ul>
          </div>

          {/* GRID PRODUK / KURSUS (KANAN) */}
          <div className="semua-grid-produk">
            {courses.map((course) => (
              <div 
                key={course.id} 
                onClick={() => onNavigate('detail-produk')}
                style={{ cursor: 'pointer' }}
              >
                <CourseCard
                  image={course.image}
                  badge={course.badge}
                  title={course.title}
                  mentor={course.mentor}
                  price={course.price}
                  rating={course.rating}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}