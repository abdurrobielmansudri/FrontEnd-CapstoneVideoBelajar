// src/views/suksesPembayaran.jsx
import React from "react";

export default function SuksesPembayaran({ onNavigate }) {
  return (
    <div className="sukses-pembayaran-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <div
          className="navbar-brand"
          onClick={() => onNavigate("beranda")}
          style={{ cursor: "pointer" }}
        >
          videobelajar
        </div>
        <div className="navbar-steps">
          <span className="step done">✓ Pilih Metode</span>
          <span className="separator">{">"}</span>
          <span className="step done">✓ Bayar</span>
          <span className="separator">{">"}</span>
          <span className="step active">● Selesai</span>
        </div>
      </nav>

      {/* KONTEN UTAMA */}
      <div className="konten-utama">
        <div className="ilustrasi-box">
          <img
            src="/assets/ilustrasi-sukses.svg"
            alt="Ilustrasi Pembayaran Berhasil"
          />
        </div>

        <h1>Pembayaran Berhasil!</h1>
        <p>
          Silakan cek email kamu untuk informasi lebih lanjut. Hubungi kami
          jika ada kendala.
        </p>

        <button
          onClick={() => {
            onNavigate("pesanan-saya");
          }}
          className="sukses-btn"
        >
          Lihat Detail Pesanan
        </button>
      </div>
    </div>
  );
}