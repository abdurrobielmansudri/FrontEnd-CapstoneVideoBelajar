// src/views/KelasSaya.jsx
import React, { useState, useEffect } from "react";
import {
  getEnrollmentsByUser,
  getCourseById,
  getTutorById,
} from "../services/api";
import { getCurrentUser } from "../services/auth";

export default function KelasSaya({ onNavigate }) {
  const [kelasList, setKelasList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("semua");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchKelas = async () => {
      const user = getCurrentUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const enrollments = await getEnrollmentsByUser(user.id);

      const hasil = await Promise.all(
        enrollments.map(async (enr) => {
          const course = await getCourseById(enr.course_id);
          if (!course) return null;

          // beberapa kelas belum punya tutor_id, jadi dicek dulu
          const tutor = course.tutor_id
            ? await getTutorById(course.tutor_id)
            : null;

          return {
            id: enr.id,
            courseId: course.id,
            enrolledAt: enr.enrolled_at,
            status: enr.status === "completed" ? "selesai" : "berjalan",
            modulSelesai: enr.modules_completed,
            totalModul: course.total_modules,
            thumbnail: course.image,
            judul: course.title,
            deskripsi: course.description,
            instrukturFoto: tutor?.photo_url || "",
            instrukturNama: tutor?.full_name || course.mentor,
            instrukturJabatan: tutor?.job_title || "",
            durasi: `${course.duration_minutes} Menit`,
            progres: enr.progress_percentage,
          };
        })
      );

      const bersih = hasil
        .filter(Boolean)
        .sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt));

      setKelasList(bersih);
      setIsLoading(false);
    };

    fetchKelas();
  }, []);

  const tabs = [
    { key: "semua", label: "Semua Kelas" },
    { key: "berjalan", label: "Sedang Berjalan" },
    { key: "selesai", label: "Selesai" },
  ];

  const filteredKelas = kelasList
    .filter((item) => (activeTab === "semua" ? true : item.status === activeTab))
    .filter((item) =>
      item.judul.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="kelas-container">
      {/* NAVBAR */}
      <header className="kelas-navbar">
        <h1
          className="kelas-logo"
          onClick={() => onNavigate("beranda")}
          style={{ cursor: "pointer" }}
        >
          video<span>belajar</span>
        </h1>
        <div className="kelas-navbar-right">
          <span>Kategori</span>
          <img
            src="/assets/avatar-user.jpg"
            alt="Avatar"
            className="kelas-avatar"
          />
        </div>
      </header>

      <main className="kelas-main">
        {/* SIDEBAR KIRI */}
        <aside className="kelas-sidebar">
          <h2 className="kelas-sidebar-title">Daftar Kelas</h2>
          <p className="kelas-sidebar-subtitle">
            Akses Materi Belajar dan Mulailah Meningkatkan Pengetahuan Anda!
          </p>

          <nav className="kelas-sidebar-nav">
            <div
              className="kelas-sidebar-item"
              onClick={() => onNavigate("profil-saya")}
            >
              👤 Profil Saya
            </div>
            <div className="kelas-sidebar-item kelas-sidebar-item-active">
              📖 Kelas Saya
            </div>
            <div
              className="kelas-sidebar-item"
              onClick={() => onNavigate("pesanan-saya")}
            >
              🛍️ Pesanan Saya
            </div>
          </nav>
        </aside>

        {/* KONTEN KANAN */}
        <section className="kelas-content">
          {/* TAB FILTER + SEARCH */}
          <div className="kelas-toolbar">
            <div className="kelas-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={
                    "kelas-tab" +
                    (activeTab === tab.key ? " kelas-tab-active" : "")
                  }
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="kelas-toolbar-right">
              <input
                type="text"
                placeholder="Cari Kelas"
                className="kelas-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* LIST KELAS */}
          <div className="kelas-list">
            {isLoading && <p className="kelas-empty">Memuat kelas...</p>}

            {!isLoading && filteredKelas.length === 0 && (
              <p className="kelas-empty">Tidak ada kelas ditemukan.</p>
            )}

            {filteredKelas.map((item) => (
              <div key={item.id} className="kelas-card">
                <div className="kelas-card-top">
                  <span className="kelas-progres-text">
                    {item.modulSelesai} / {item.totalModul} Modul Terselesaikan
                  </span>
                  <span
                    className={
                      "kelas-badge " +
                      (item.status === "selesai"
                        ? "kelas-badge-selesai"
                        : "kelas-badge-berjalan")
                    }
                  >
                    {item.status === "selesai" ? "Selesai" : "Sedang Berjalan"}
                  </span>
                </div>

                <div className="kelas-card-body">
                  <img
                    src={item.thumbnail}
                    alt={item.judul}
                    className="kelas-thumbnail"
                  />

                  <div className="kelas-card-info">
                    <h3 className="kelas-judul">{item.judul}</h3>
                    <p className="kelas-deskripsi">{item.deskripsi}</p>

                    <div className="kelas-instruktur">
                      {item.instrukturFoto && (
                        <img
                          src={item.instrukturFoto}
                          alt={item.instrukturNama}
                          className="kelas-instruktur-foto"
                        />
                      )}
                      <div>
                        <div className="kelas-instruktur-nama">
                          {item.instrukturNama}
                        </div>
                        <div className="kelas-instruktur-jabatan">
                          {item.instrukturJabatan}
                        </div>
                      </div>
                    </div>

                    <div className="kelas-meta">
                      <span>📄 {item.totalModul} Modul</span>
                      <span>🕒 {item.durasi}</span>
                    </div>
                  </div>
                </div>

                <div className="kelas-card-footer">
                  <div className="kelas-progres-bar-wrapper">
                    <span className="kelas-progres-label">
                      Progres Kelas: {item.progres}%
                    </span>
                    <div className="kelas-progres-bar-bg">
                      <div
                        className="kelas-progres-bar-fill"
                        style={{ width: `${item.progres}%` }}
                      />
                    </div>
                  </div>

                  <div className="kelas-card-actions">
                    {item.status === "selesai" ? (
                      <>
                        <button className="kelas-btn-outline">
                          Unduh Sertifikat
                        </button>
                        <button
                          className="kelas-btn-primary"
                          onClick={() => onNavigate("belajar-kelas")}
                        >
                          Lihat Detail Kelas
                        </button>
                      </>
                    ) : (
                      <button
                        className="kelas-btn-primary"
                        onClick={() => onNavigate("belajar-kelas")}
                      >
                        Lanjutkan Pembelajaran
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}