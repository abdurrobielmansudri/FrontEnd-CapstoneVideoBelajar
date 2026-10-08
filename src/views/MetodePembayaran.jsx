// src/views/MetodePembayaran.jsx
import React, { useState, useEffect } from "react";
import { getCourseById, createOrder, createEnrollment } from "../services/api";
import { getCurrentUser } from "../services/auth";

const ADMIN_FEE = 7500;

// "Rp 300.000" -> 300000
function parseRupiahToNumber(rupiahString) {
  if (!rupiahString) return 0;
  if (typeof rupiahString === "number") return rupiahString;
  const digitsOnly = rupiahString.replace(/[^0-9]/g, "");
  return parseInt(digitsOnly, 10) || 0;
}

// 300000 -> "Rp 300.000"
function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

export default function MetodePembayaran({ onNavigate, courseId }) {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState("Bank BCA");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        setIsLoading(false);
        return;
      }
      const data = await getCourseById(courseId);
      setCourse(data);
      setIsLoading(false);
    };
    fetchCourse();
  }, [courseId]);

  const harga = parseRupiahToNumber(course?.price);
  const total = harga + ADMIN_FEE;

  const handleBayar = async () => {
    const user = getCurrentUser();
    if (!user) {
      alert("Silakan login terlebih dahulu.");
      onNavigate("login");
      return;
    }

    setIsSubmitting(true);

    const order = await createOrder({
      user_id: user.id,
      course_id: course.id,
      invoice: "HEL/VI/" + Date.now().toString().slice(-8),
      created_at: new Date().toISOString(),
      status: "berhasil", // berhasil | gagal | menunggu
      course_title: course.title,
      course_image: course.image,
      price: harga,
      admin_fee: ADMIN_FEE,
      total,
      payment_method: selectedMethod,
    });

    if (!order) {
      setIsSubmitting(false);
      alert("Pembayaran gagal, silakan coba lagi.");
      return;
    }

    // Opsional: langsung masukkan ke "Kelas Saya"
    await createEnrollment({
      user_id: user.id,
      course_id: course.id,
      order_id: order.id,
      status: "ongoing",
      modules_completed: 0,
      progress_percentage: 0,
      certificate_url: "",
      enrolled_at: new Date().toISOString(),
    });

    setIsSubmitting(false);
    onNavigate("sukses-pembayaran", course.id);
  };

  if (isLoading) {
    return (
      <div className="bayar-container">
        <p style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
          Memuat data pesanan...
        </p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="bayar-container">
        <p style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
          Data kelas tidak ditemukan. Silakan pilih kelas terlebih dahulu.
        </p>
        <div style={{ textAlign: "center" }}>
          <button onClick={() => onNavigate("beranda")} className="detail-back-btn">
            ← Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bayar-container">
      {/* NAVBAR */}
      <header className="bayar-navbar">
        <h1 className="bayar-logo" onClick={() => onNavigate("beranda")}>
          video<span>belajar</span>
        </h1>
        <div className="bayar-step-indicator">
          <span className="bayar-step-active">● Pilih Metode</span> &gt; <span>Bayar</span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="bayar-main">
        {/* KOLOM KIRI: PILIHAN METODE PEMBAYARAN */}
        <div>
          <h2 className="bayar-section-title">Metode Pembayaran</h2>

          {/* Transfer Bank */}
          <div className="bayar-card-box">
            <h4 className="bayar-card-title">Transfer Bank</h4>
            <div>
              {["Bank BCA", "Bank Mandiri", "Bank BNI"].map((bank) => (
                <label className="bayar-option-item" key={bank}>
                  <span>🏦 {bank}</span>
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedMethod === bank}
                    onChange={() => setSelectedMethod(bank)}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* E-Wallet */}
          <div className="bayar-card-box">
            <h4 className="bayar-card-title">E-Wallet</h4>
            <div>
              {["Dana", "OVO", "ShopeePay"].map((wallet) => (
                <label className="bayar-option-item" key={wallet}>
                  <span>📱 {wallet}</span>
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedMethod === wallet}
                    onChange={() => setSelectedMethod(wallet)}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Kartu Kredit */}
          <div className="bayar-card-box">
            <h4 className="bayar-card-title">Kartu Kredit / Debit</h4>
            <div>
              <label className="bayar-option-item">
                <span>💳 Visa / MasterCard</span>
                <input
                  type="radio"
                  name="payment"
                  checked={selectedMethod === "Visa / MasterCard"}
                  onChange={() => setSelectedMethod("Visa / MasterCard")}
                />
              </label>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: RINGKASAN PESANAN */}
        <div>
          <div className="bayar-summary-card">
            <h3 className="bayar-summary-title">Ringkasan Pesanan</h3>

            <div className="bayar-summary-details">
              <div className="bayar-summary-row">
                <span>{course.title}</span>
                <span className="bayar-summary-value">{formatRupiah(harga)}</span>
              </div>
              <div className="bayar-summary-row">
                <span>Biaya Admin</span>
                <span className="bayar-summary-value">{formatRupiah(ADMIN_FEE)}</span>
              </div>
            </div>

            <div className="bayar-total-row">
              <span className="bayar-total-label">Total Pembayaran</span>
              <span className="bayar-total-price">{formatRupiah(total)}</span>
            </div>

            <button
              onClick={handleBayar}
              disabled={isSubmitting}
              className="bayar-btn-primary"
            >
              {isSubmitting ? "Memproses..." : "Bayar Sekarang"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}