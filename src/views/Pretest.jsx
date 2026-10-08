// src/views/Pretest.jsx
import React, { useState } from "react";

const questions = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  text:
    "Memikirkan dan mengantisipasi secara teliti adanya user secara tidak sengaja mengutak-atik konfigurasi, namun dapat diatasi dengan membuat default yang mengurangi kepanikan pada user adalah pengertian dari ...",
  options: [
    "Memikirkan tentang default",
    "Mempertimbangkan page layout berdasarkan suatu tujuan tertentu",
    "Memastikan bahwa sistem berjalan sesuai dengan apa yang terjadi saat itu juga",
    "Menciptakan konsistensi dan menggunakan elemen UI umum",
  ],
  correctIndex: 0, // dummy, ganti sesuai kunci jawaban asli nanti
}));

function formatTanggalSekarang() {
  const now = new Date();
  const hari = now.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const jam = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${hari}, ${jam}`;
}

export default function Pretest({ onNavigate }) {
  const [step, setStep] = useState("rules"); // rules | questions | result
  const [currentQ, setCurrentQ] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [finishedAt, setFinishedAt] = useState(null);

  const question = questions.find((q) => q.id === currentQ);
  const isLast = currentQ === questions.length;

  const handleAnswer = (optionIndex) => {
    setAnswers({ ...answers, [currentQ]: optionIndex });
  };

  const handleNext = () => {
    if (isLast) {
      setShowConfirm(true);
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  const handleSelesaikan = () => {
    setShowConfirm(false);
    setFinishedAt(formatTanggalSekarang());
    setStep("result");
  };

  // Hitung skor
  const totalSoal = questions.length;
  const jumlahBenar = questions.filter(
    (q) => answers[q.id] === q.correctIndex
  ).length;
  const jumlahSalah = totalSoal - jumlahBenar;
  const nilai = Math.round((jumlahBenar / totalSoal) * 100);

  // ===== STEP 1: ATURAN =====
  if (step === "rules") {
    return (
      <div className="pretest-container">
        <div className="pretest-rules-box">
          <div className="pretest-illustration">🏖️ RULES</div>
          <h2 className="pretest-rules-title">Aturan</h2>
          <p className="pretest-rules-text">
            Kerjakan pretest dengan sebaik mungkin untuk mengukur pemahaman awalmu terkait materi yang akan kamu pelajari
          </p>
          <p className="pretest-rules-text">
            <strong>Syarat Nilai Kelulusan:</strong> -<br />
            <strong>Durasi Ujian:</strong> 5 Menit
          </p>
          <p className="pretest-rules-text">
            Jangan khawatir, total skor tidak akan mempengaruhi kelulusan dan penilaian akhirmu dalam rangkaian kelas ini
          </p>
          <button className="pretest-btn-primary" onClick={() => setStep("questions")}>
            Mulai Pre-Test
          </button>
        </div>
      </div>
    );
  }

  // ===== STEP 3: HASIL / CONGRATS =====
  if (step === "result") {
    return (
      <div className="pretest-container">
        <div className="pretest-result-box">
          <div className="pretest-congrats-banner">
            <span className="pretest-congrats-text">CONGRATS</span>
          </div>

          <p className="pretest-result-label">Tanggal Pretest:</p>
          <p className="pretest-result-date">{finishedAt}</p>

          <div className="pretest-result-stats">
            <div className="pretest-stat-card pretest-stat-nilai">
              <span className="pretest-stat-label">Nilai</span>
              <span className="pretest-stat-value">{nilai}</span>
            </div>
            <div className="pretest-stat-card">
              <span className="pretest-stat-label">Soal</span>
              <span className="pretest-stat-value">{totalSoal}</span>
            </div>
            <div className="pretest-stat-card">
              <span className="pretest-stat-label">Benar</span>
              <span className="pretest-stat-value pretest-stat-benar">✓ {jumlahBenar}</span>
            </div>
            <div className="pretest-stat-card">
              <span className="pretest-stat-label">Salah</span>
              <span className="pretest-stat-value pretest-stat-salah">✕ {jumlahSalah}</span>
            </div>
          </div>

          <h3 className="pretest-result-title">Selesai!</h3>
          <p className="pretest-result-desc">
            Pretest sudah selesai dan kami sudah mengetahui progresmu.
          </p>
          <p className="pretest-result-desc">Saatnya memulai kelas!</p>

          <button
            className="pretest-btn-primary pretest-result-btn"
            onClick={() => onNavigate("belajar-kelas")}
          >
            Mulai Kelas
          </button>
        </div>
      </div>
    );
  }

  // ===== STEP 2: SOAL =====
  return (
    <div className="pretest-container pretest-container-wide">
      {/* NAVIGATOR NOMOR SOAL */}
      <aside className="pretest-nav">
        <div className="pretest-nav-grid">
          {questions.map((q) => (
            <button
              key={q.id}
              className={
                "pretest-nav-item" +
                (q.id === currentQ ? " pretest-nav-item-active" : "") +
                (answers[q.id] !== undefined ? " pretest-nav-item-done" : "")
              }
              onClick={() => setCurrentQ(q.id)}
            >
              {q.id}
            </button>
          ))}
        </div>
        <p className="pretest-nav-hint">Selesaikan semua soal untuk mengakhiri quiz</p>
      </aside>

      {/* SOAL AKTIF */}
      <div className="pretest-question-box">
        <h3 className="pretest-question-title">Pertanyaan {currentQ}</h3>
        <p className="pretest-question-text">{question.text}</p>

        <div className="pretest-options">
          {question.options.map((opt, idx) => (
            <label
              key={idx}
              className={
                "pretest-option" + (answers[currentQ] === idx ? " pretest-option-selected" : "")
              }
            >
              <input
                type="radio"
                name={`q-${currentQ}`}
                checked={answers[currentQ] === idx}
                onChange={() => handleAnswer(idx)}
              />
              {opt}
            </label>
          ))}
        </div>

        <div className="pretest-nav-buttons">
          <button
            className="pretest-btn-outline"
            disabled={currentQ === 1}
            onClick={() => setCurrentQ(currentQ - 1)}
          >
            ← Sebelumnya
          </button>
          <button className="pretest-btn-primary" onClick={handleNext}>
            {isLast ? "Submit →" : "Selanjutnya →"}
          </button>
        </div>
      </div>

      {/* MODAL KONFIRMASI SUBMIT */}
      {showConfirm && (
        <div className="pretest-modal-overlay">
          <div className="pretest-modal">
            <div className="pretest-modal-illustration">🤝</div>
            <h3>Selesaikan Pretest</h3>
            <p>Apakah kamu yakin untuk menyelesaikan pretest ini?</p>
            <div className="pretest-modal-actions">
              <button className="pretest-btn-outline" onClick={() => setShowConfirm(false)}>
                Batal
              </button>
              <button className="pretest-btn-primary" onClick={handleSelesaikan}>
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}