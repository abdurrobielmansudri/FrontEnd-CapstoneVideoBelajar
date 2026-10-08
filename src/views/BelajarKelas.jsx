// src/views/BelajarKelas.jsx
import React, { useState } from "react";

const modulesData = [
  {
    id: "mod-1",
    title: "Introduction to HR",
    materials: [
      { id: "m1", type: "pretest", title: "Pre-Test: Introduction to HR", meta: "10 Pertanyaan", completed: true },
      { id: "m2", type: "video", title: "Video: Introduction to HR", meta: "12 Menit", completed: true },
      { id: "m3", type: "video", title: "Video: Introduction to HR", meta: "12 Menit", completed: true },
      { id: "m4", type: "video", title: "Video: Introduction to HR", meta: "12 Menit", completed: false },
      { id: "m5", type: "video", title: "Video: Introduction to HR", meta: "12 Menit", completed: false },
      { id: "m6", type: "rangkuman", title: "Rangkuman: Introduction to HR", meta: "12 Menit", completed: false },
      { id: "m7", type: "quiz", title: "Quiz: Introduction to HR", meta: "10 Pertanyaan", completed: false },
    ],
  },
  {
    id: "mod-2",
    title: "Fundamentals of HR",
    materials: [
      { id: "m8", type: "video", title: "Video: Fundamentals of HR", meta: "12 Menit", completed: false },
      { id: "m9", type: "video", title: "Video: Fundamentals of HR", meta: "12 Menit", completed: false },
    ],
  },
];

const typeIcon = { video: "▶", rangkuman: "📄", quiz: "📝", pretest: "📝" };

function flattenMaterials(modules) {
  return modules.flatMap((m) => m.materials);
}

export default function BelajarKelas({ onNavigate }) {
  const allMaterials = flattenMaterials(modulesData);
  const [activeId, setActiveId] = useState(allMaterials[1]?.id || allMaterials[0].id);
  const [openModule, setOpenModule] = useState(modulesData[0].id);

  // State untuk modal review
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const activeMaterial =
    allMaterials.find((m) => m.id === activeId) || allMaterials[0];

  const completedCount = allMaterials.filter((m) => m.completed).length;
  const progress = Math.round((completedCount / allMaterials.length) * 100);

  const handleSelectMaterial = (material) => {
    if (material.type === "pretest" || material.type === "quiz") {
      onNavigate("pretest");
      return;
    }
    setActiveId(material.id);
  };

  const handleSubmitReview = () => {
    // TODO: kirim { rating: reviewRating, comment: reviewText } ke API/db.json (tabel reviews)
    console.log("Review submitted:", { rating: reviewRating, comment: reviewText });
    setShowReviewModal(false);
    setReviewRating(0);
    setReviewText("");
    alert("Terima kasih atas review-nya!");
  };

  return (
    <div className="belajar-container">
      {/* HEADER */}
      <header className="belajar-header">
        <button className="belajar-back-btn" onClick={() => onNavigate("kelas-saya")}>
          ← Foundations of User Experience Design
        </button>
        <div className="belajar-progress-wrapper">
          <div className="belajar-progress-bar-bg">
            <div className="belajar-progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="belajar-progress-text">{completedCount}/{allMaterials.length}</span>
        </div>
        <img src="/assets/avatar-user.jpg" alt="Avatar" className="belajar-avatar" />
      </header>

      <div className="belajar-main">
        {/* KONTEN KIRI: VIDEO / MATERI */}
        <div className="belajar-content">
          {activeMaterial.type === "video" ? (
            <div className="belajar-video-box">
              <button className="belajar-play-btn">▶</button>
            </div>
          ) : (
            <div className="belajar-video-box belajar-video-box-doc">
              <span>{typeIcon[activeMaterial.type]} {activeMaterial.title}</span>
            </div>
          )}

          <h2 className="belajar-material-title">{activeMaterial.title}</h2>
          <p className="belajar-material-desc">
            Pelajari dan praktikkan skill teknis dalam berbagai industri dengan Technical Book Riselearn
          </p>

          <div className="belajar-mentor">
            <img src="/assets/avatar-jenna.jpg" alt="Jenna Ortega" className="belajar-mentor-foto" />
            <div>
              <div className="belajar-mentor-nama">Jenna Ortega</div>
              <div className="belajar-mentor-jabatan">Senior Accountant di Gojek</div>
            </div>
          </div>

          <div className="belajar-rating">★★★☆☆ <span>3.5 (86)</span></div>
        </div>

        {/* SIDEBAR KANAN: DAFTAR MODUL */}
        <aside className="belajar-sidebar">
          {modulesData.map((mod) => (
            <div key={mod.id} className="belajar-module-group">
              <button
                className="belajar-module-header"
                onClick={() => setOpenModule(openModule === mod.id ? null : mod.id)}
              >
                <span>{mod.title}</span>
                <span>{openModule === mod.id ? "▲" : "▼"}</span>
              </button>

              {openModule === mod.id && (
                <div className="belajar-module-items">
                  {mod.materials.map((item) => (
                    <button
                      key={item.id}
                      className={
                        "belajar-material-item" +
                        (item.id === activeId ? " belajar-material-item-active" : "")
                      }
                      onClick={() => handleSelectMaterial(item)}
                    >
                      <span className="belajar-material-icon">
                        {item.completed ? "✅" : typeIcon[item.type]}
                      </span>
                      <span className="belajar-material-info">
                        <span className="belajar-material-item-title">{item.title}</span>
                        <span className="belajar-material-item-meta">{item.meta}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button className="belajar-review-banner" onClick={() => setShowReviewModal(true)}>
            ★ Beri Review & Rating
          </button>
        </aside>
      </div>

      {/* BOTTOM BAR NAVIGASI KELAS */}
      <footer className="belajar-bottom-bar">
        <button className="belajar-bottom-btn" onClick={() => onNavigate("kelas-saya")}>
          ← Foundations of User Experience Design
        </button>
        <button className="belajar-bottom-btn belajar-bottom-btn-right" onClick={() => onNavigate("kelas-saya")}>
          Foundations of User Experience Design →
        </button>
      </footer>

      {/* MODAL REVIEW */}
      {showReviewModal && (
        <div className="review-modal-overlay">
          <div className="review-modal">
            <h3 className="review-modal-title">Tulis Review Terbaikmu!</h3>
            <p className="review-modal-subtitle">
              Bagikan pengalaman belajarmu di kelas ini untuk membantu peserta lain
            </p>

            <div className="review-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={
                    "review-star" +
                    (star <= (hoverRating || reviewRating) ? " review-star-filled" : "")
                  }
                  onClick={() => setReviewRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              className="review-textarea"
              placeholder="Masukkan Review"
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <div className="review-modal-actions">
              <button
                className="pretest-btn-outline"
                onClick={() => setShowReviewModal(false)}
              >
                Batal
              </button>
              <button
                className="pretest-btn-primary"
                disabled={reviewRating === 0}
                onClick={handleSubmitReview}
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}