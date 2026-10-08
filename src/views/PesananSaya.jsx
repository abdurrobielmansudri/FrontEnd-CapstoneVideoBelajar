// src/views/PesananSaya.jsx
import React, { useState, useEffect } from "react";
import { getOrdersByUser } from "../services/api";
import { getCurrentUser } from "../services/auth";

const formatRupiah = (angka) =>
  "Rp " + Number(angka).toLocaleString("id-ID");

const formatWaktu = (iso) =>
  new Date(iso).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const statusConfig = {
  berhasil: { label: "Berhasil", className: "badge-berhasil" },
  gagal: { label: "Gagal", className: "badge-gagal" },
  menunggu: { label: "Belum Bayar", className: "badge-menunggu" },
};

export default function PesananSaya({ onNavigate }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("terbaru");

  useEffect(() => {
    const fetchOrders = async () => {
      const user = getCurrentUser();
      if (user) {
        const data = await getOrdersByUser(user.id);
        setOrders(data);
      }
      setIsLoading(false);
    };
    fetchOrders();
  }, []);

  const tabs = [
    { key: "semua", label: "Semua Pesanan" },
    { key: "menunggu", label: "Menunggu" },
    { key: "berhasil", label: "Berhasil" },
    { key: "gagal", label: "Gagal" },
  ];

  const filteredPesanan = orders
    .filter((item) =>
      activeTab === "semua" ? true : item.status === activeTab
    )
    .filter((item) =>
      item.course_title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "terbaru"
        ? new Date(b.created_at) - new Date(a.created_at)
        : new Date(a.created_at) - new Date(b.created_at)
    );

  return (
    <div className="pesanan-container">
      {/* NAVBAR */}
      <header className="pesanan-navbar">
        <h1
          className="pesanan-logo"
          onClick={() => onNavigate("beranda")}
          style={{ cursor: "pointer" }}
        >
          video<span>belajar</span>
        </h1>
        <div className="pesanan-navbar-right">
          <span>Kategori</span>
          <img
            src="/assets/avatar-user.jpg"
            alt="Avatar"
            className="pesanan-avatar"
          />
        </div>
      </header>

      <main className="pesanan-main">
        {/* SIDEBAR KIRI */}
        <aside className="pesanan-sidebar">
          <h2 className="pesanan-sidebar-title">Daftar Pesanan</h2>
          <p className="pesanan-sidebar-subtitle">
            Informasi terperinci mengenai pembelian
          </p>

          <nav className="pesanan-sidebar-nav">
            <div
              className="pesanan-sidebar-item"
              onClick={() => onNavigate("profil-saya")}
            >
              👤 Profil Saya
            </div>
            <div
              className="pesanan-sidebar-item"
              onClick={() => onNavigate("kelas-saya")}
            >
              📖 Kelas Saya
            </div>
            <div className="pesanan-sidebar-item pesanan-sidebar-item-active">
              🛍️ Pesanan Saya
            </div>
          </nav>
        </aside>

        {/* KONTEN KANAN */}
        <section className="pesanan-content">
          {/* TAB FILTER + SEARCH + SORT */}
          <div className="pesanan-toolbar">
            <div className="pesanan-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={
                    "pesanan-tab" +
                    (activeTab === tab.key ? " pesanan-tab-active" : "")
                  }
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="pesanan-toolbar-right">
              <input
                type="text"
                placeholder="Cari Kelas"
                className="pesanan-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="pesanan-sort"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="terbaru">Terbaru</option>
                <option value="terlama">Terlama</option>
              </select>
            </div>
          </div>

          {/* LIST PESANAN */}
          <div className="pesanan-list">
            {isLoading && <p className="pesanan-empty">Memuat pesanan...</p>}

            {!isLoading && filteredPesanan.length === 0 && (
              <p className="pesanan-empty">Tidak ada pesanan ditemukan.</p>
            )}

            {filteredPesanan.map((item) => (
              <div key={item.id} className="pesanan-card">
                <div className="pesanan-card-header">
                  <div className="pesanan-card-header-left">
                    <span>No. Invoice: </span>
                    <a href="#" className="pesanan-invoice-link">
                      {item.invoice}
                    </a>
                    <span className="pesanan-waktu">
                      {" "}
                      Waktu Pembayaran: {formatWaktu(item.created_at)}
                    </span>
                  </div>
                  <span
                    className={`pesanan-badge ${statusConfig[item.status].className}`}
                  >
                    {statusConfig[item.status].label}
                  </span>
                </div>

                <div className="pesanan-card-body">
                  <img
                    src={item.course_image}
                    alt={item.course_title}
                    className="pesanan-thumbnail"
                  />
                  <div className="pesanan-nama-kelas">{item.course_title}</div>
                  <div className="pesanan-harga">
                    <span className="pesanan-harga-label">Harga</span>
                    <span className="pesanan-harga-value">
                      {formatRupiah(item.price)}
                    </span>
                  </div>
                </div>

                <div className="pesanan-card-footer">
                  <span>Total Pembayaran</span>
                  <span className="pesanan-total-value">
                    {formatRupiah(item.total)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}