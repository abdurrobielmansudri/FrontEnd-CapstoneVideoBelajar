// src/views/Beranda.jsx
import React, { useState, useEffect } from 'react';
import CourseCard from '../ui/CourseCard';
import { getCourses, addCourseAPI, updateCourseAPI, deleteCourseAPI } from '../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { setCourses, addCourse, updateCourse, deleteCourse } from '../store/redux/store';

function Beranda({ onNavigate }) {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.list);

  useEffect(() => {
    const fetchCoursesData = async () => {
      const data = await getCourses();
      dispatch(setCourses(data));
    };

    fetchCoursesData();
  }, [dispatch]);

  const [formData, setFormData] = useState({
    image: '',
    badge: '',
    title: '',
    mentor: '',
    price: '',
    rating: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedData = { ...formData, id: editId };
      const result = await updateCourseAPI(editId, updatedData);
      if (result) {
        dispatch(updateCourse(result));
      }
      setIsEditing(false);
      setEditId(null);
    } else {
      const newCourseData = {
        image: formData.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500",
        badge: formData.badge,
        title: formData.title,
        mentor: formData.mentor,
        price: formData.price,
        rating: formData.rating || "5.0 (1)"
      };
      const result = await addCourseAPI(newCourseData);
      if (result) {
        dispatch(addCourse(result));
      }
    }
    setFormData({ image: '', badge: '', title: '', mentor: '', price: '', rating: '' });
  };

  const handleDelete = async (id) => {
    const result = await deleteCourseAPI(id);
    if (result !== null) {
      dispatch(deleteCourse(id));
    }
  };

  const handleEdit = (course) => {
    setIsEditing(true);
    setEditId(course.id);
    setFormData({
      image: course.image,
      badge: course.badge,
      title: course.title,
      mentor: course.mentor,
      price: course.price,
      rating: course.rating
    });
    window.scrollTo({ top: 500, behavior: 'smooth' });
  };

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
        
        <div className="header-right">
          <div className="profile-avatar">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100" alt="Avatar Profil" />
          </div>
          <button onClick={() => onNavigate('semua-produk')} className="semua-back-btn">
             Kategori / Lihat Semua Produk
          </button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Temukan Kumpulan Video Belajar Terbaik di Sini</h1>
            <p>Tingkatkan keahlianmu bersama mentor profesional dengan materi yang dirancang khusus untuk industri saat ini.</p>
            <a href="#koleksi" className="btn-hero">Mulai Belajar</a>
          </div>
        </section>

        {/* CRUD FORM SECTION */}
        <section style={{ padding: '30px 20px', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
            <h3 style={{ marginBottom: '16px', color: '#1e293b' }}>
              {isEditing ? '✏️ Edit Kursus / Video' : ' Tambah Kursus Baru '}
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <input type="text" name="title" placeholder="Judul Kursus" value={formData.title} onChange={handleChange} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <input type="text" name="badge" placeholder="Kategori (Badge)" value={formData.badge} onChange={handleChange} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <input type="text" name="mentor" placeholder="Nama Mentor" value={formData.mentor} onChange={handleChange} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <input type="text" name="price" placeholder="Harga (Contoh: Rp 150.000)" value={formData.price} onChange={handleChange} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <input type="text" name="image" placeholder="URL Gambar (Opsional)" value={formData.image} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <input type="text" name="rating" placeholder="Rating (Contoh: 4.8 (100))" value={formData.rating} onChange={handleChange} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ background: '#22c55e', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                  {isEditing ? 'Simpan Perubahan' : 'Tambah Kursus'}
                </button>
                {isEditing && (
                  <button type="button" onClick={() => { setIsEditing(false); setFormData({ image: '', badge: '', title: '', mentor: '', price: '', rating: '' }); }} style={{ background: '#64748b', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* COURSE SECTION */}
        <section id="koleksi" className="course-section">
          <h2>Koleksi Video Pembelajaran Unggulan</h2>
          <p className="section-subtitle">Jelajahi berbagai kategori kelas untuk memulai perjalanan jenjang kariermu.</p>

          <div className="category-tabs">
            <button className="tab-btn active">Semua Kelas</button>
            <button className="tab-btn">Pemasaran</button>
            <button className="tab-btn">Desain</button>
            <button className="tab-btn">Pengembangan Diri</button>
            <button className="tab-btn">Bisnis</button>
          </div>

          <div className="course-grid">
            {courses.map((course) => (
              <div 
                key={course.id} 
                onClick={() => onNavigate('detail-produk', course.id)} 
                style={{ position: 'relative', cursor: 'pointer' }}
              >
                <CourseCard
                  image={course.image}
                  badge={course.badge}
                  title={course.title}
                  mentor={course.mentor}
                  price={course.price}
                  rating={course.rating}
                />
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }} onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => handleEdit(course)} style={{ flex: 1, background: '#3b82f6', color: 'white', border: 'none', padding: '6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(course.id)} style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NEWSLETTER SECTION */}
        <section className="newsletter-section">
          <div className="newsletter-box">
            <h2>Mau Dapat Info Kelas Gratis?</h2>
            <p>Daftarkan email Anda untuk mendapatkan update e-newsletter mingguan dan promo kelas menarik dari videobelajar!</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Masukkan email aktif Anda" required />
              <button type="submit">Langganan</button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="main-footer">
        <div className="footer-grid">
          <div className="footer-info">
            <h3>video<span>belajar</span></h3>
            <p>Platform pembelajaran video interaktif terbaik untuk meningkatkan skill masa kini.</p>
            <p className="copyright">&copy; 2026 videobelajar. All rights reserved.</p>
            <p className="created-by" style={{ fontSize: '0.8rem', color: '#22c55e', marginTop: '5px', fontWeight: '600' }}>⚡ Created with by Abdurrobi</p>
          </div>
          <div className="footer-links">
            <h4>Kategori</h4>
            <a href="#">Pemasaran</a>
            <a href="#">Desain</a>
            <a href="#">Pengembangan Diri</a>
            <a href="#">Bisnis</a>
          </div>
          <div className="footer-socials">
            <h4>Ikuti Kami</h4>
            <div className="social-icons">
              <a href="#">Instagram</a> | <a href="#">LinkedIn</a> | <a href="#">YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Beranda;