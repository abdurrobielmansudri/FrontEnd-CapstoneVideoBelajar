// src/views/DetailProduk.jsx
import React, { useState, useEffect } from 'react';
import { getCourseById, getTutorById } from '../services/api';

export default function DetailProduk({ onNavigate, courseId }) {
  const [course, setCourse] = useState(null);
  const [tutor, setTutor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);

      if (!courseId) {
        setIsLoading(false);
        return;
      }

      const courseData = await getCourseById(courseId);
      setCourse(courseData);

      if (courseData?.tutor_id) {
        const tutorData = await getTutorById(courseData.tutor_id);
        setTutor(tutorData);
      }

      setIsLoading(false);
    };

    fetchDetail();
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="detail-container">
        <p style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Memuat detail kelas...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="detail-container">
        <p style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
          Data kelas tidak ditemukan. Silakan kembali dan pilih kelas lain.
        </p>
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => onNavigate('beranda')} className="detail-back-btn">
            ← Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-container">
      {/* Navbar Sederhana */}
      <header className="detail-navbar">
        <h1 className="detail-logo" onClick={() => onNavigate('beranda')}>
          video<span>belajar</span>
        </h1>
        <button
          onClick={() => onNavigate('semua-produk')}
          className="detail-back-btn"
        >
          Kembali ke Semua Produk
        </button>
      </header>

      {/* Konten Utama Detail Produk */}
      <main className="detail-main">

        {/* Kolom Kiri (Informasi Utama) */}
        <div className="detail-left">
          {/* Banner / Thumbnail Kursus */}
          <div
            className="detail-banner"
            style={{
              backgroundImage: course.image ? `url(${course.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!course.image && '[Banner / Video Preview Kursus]'}
          </div>

          {/* Judul & Deskripsi */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
              {course.title}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
              Pelajari bersama tutor profesional di Video Course. Kapanpun, di manapun.
            </p>
          </div>

          {/* Deskripsi Box */}
          <div className="detail-card-box">
            <h3 style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '12px' }}>Deskripsi</h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.6', margin: 0 }}>
              {course.description || 'Belum ada deskripsi untuk kelas ini.'}
            </p>
          </div>

          {/* Tutor */}
          <div className="detail-card-box">
            <h3 style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Belajar bersama Tutor Profesional</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {tutor?.photo_url ? (
                <img
                  src={tutor.photo_url}
                  alt={tutor.full_name}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '48px', height: '48px', backgroundColor: '#cbd5e1', borderRadius: '50%' }}></div>
              )}
              <div>
                <h4 style={{ fontWeight: 'bold', fontSize: '0.95rem', color: '#1e293b', margin: 0 }}>
                  {tutor?.full_name || course.mentor || 'Tutor belum tersedia'}
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '4px 0 0 0' }}>
                  {tutor?.job_title || '-'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan (Card Harga) */}
        <div>
          <div className="detail-price-card">
            <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1e293b', marginBottom: '12px' }}>
              {course.title}
            </h3>
            <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#f97316', marginBottom: '24px' }}>
              {course.price}
            </div>
            <button
              onClick={() => onNavigate('metode-pembayaran', course.id)}
              className="detail-buy-btn"
            >
              Beli Sekarang
            </button>
            <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ margin: 0 }}>✔ Garansi uang kembali</p>
              <p style={{ margin: 0 }}>✔ Akses selamanya</p>
              <p style={{ margin: 0 }}>✔ Sertifikat kelulusan</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}