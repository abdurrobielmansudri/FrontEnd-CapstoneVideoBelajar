// src/views/ProfilSaya.jsx
import React, { useState, useEffect } from "react";
import { getUserById, updateUserAPI } from "../services/api";
import { getCurrentUser, saveCurrentUser } from "../services/auth";

export default function ProfilSaya({ onNavigate }) {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [kodeNegara, setKodeNegara] = useState("+62");
  const [noHp, setNoHp] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const current = getCurrentUser();
      if (!current) {
        setIsLoading(false);
        return;
      }

      const data = await getUserById(current.id);
      if (data) {
        setUserId(data.id);
        setNamaLengkap(data.name || "");
        setEmail(data.email || "");
        setKodeNegara(data.phone_code || "+62");
        setNoHp(data.phone || "");
        setJenisKelamin(data.gender || "");
        setFotoUrl(data.photo_url || "");
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const handleSimpan = async () => {
    if (!namaLengkap.trim() || !email.trim()) {
      alert("Nama lengkap dan e-mail tidak boleh kosong.");
      return;
    }

    setIsSaving(true);

    const payload = {
      name: namaLengkap,
      email,
      phone: noHp,
      phone_code: kodeNegara,
      gender: jenisKelamin,
    };
    // password hanya dikirim kalau diisi
    if (password) payload.password = password;

    const updated = await updateUserAPI(userId, payload);
    setIsSaving(false);

    if (!updated) {
      alert("Gagal menyimpan perubahan, silakan coba lagi.");
      return;
    }

    saveCurrentUser(updated); // samakan data di localStorage
    setPassword("");
    alert("Perubahan profil berhasil disimpan!");
  };

  if (isLoading) {
    return (
      <div className="profil-container">
        <p style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
          Memuat profil...
        </p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="profil-container">
        <p style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
          Silakan login terlebih dahulu untuk melihat profil.
        </p>
        <div style={{ textAlign: "center" }}>
          <button className="profil-btn-simpan" onClick={() => onNavigate("login")}>
            Ke Halaman Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profil-container">
      {/* NAVBAR */}
      <header className="profil-navbar">
        <h1
          className="profil-logo"
          onClick={() => onNavigate("beranda")}
          style={{ cursor: "pointer" }}
        >
          video<span>belajar</span>
        </h1>
        <div className="profil-navbar-right">
          <span>Kategori</span>
          <img
            src={fotoUrl || "/assets/avatar-user.jpg"}
            alt="Avatar"
            className="profil-avatar-nav"
          />
        </div>
      </header>

      <main className="profil-main">
        {/* SIDEBAR KIRI */}
        <aside className="profil-sidebar">
          <h2 className="profil-sidebar-title">Ubah Profil</h2>
          <p className="profil-sidebar-subtitle">Ubah data diri Anda</p>

          <nav className="profil-sidebar-nav">
            <div className="profil-sidebar-item profil-sidebar-item-active">
              👤 Profil Saya
            </div>
            <div
              className="profil-sidebar-item"
              onClick={() => onNavigate("kelas-saya")}
            >
              📖 Kelas Saya
            </div>
            <div
              className="profil-sidebar-item"
              onClick={() => onNavigate("pesanan-saya")}
            >
              🛍️ Pesanan Saya
            </div>
          </nav>
        </aside>

        {/* KONTEN KANAN: FORM PROFIL */}
        <section className="profil-content">
          <div className="profil-card">
            {/* HEADER: FOTO + NAMA + EMAIL */}
            <div className="profil-header">
              <img
                src={fotoUrl || "/assets/avatar-user.jpg"}
                alt="Foto Profil"
                className="profil-foto"
              />
              <div>
                <h3 className="profil-nama">{namaLengkap}</h3>
                <p className="profil-email-text">{email}</p>
                <button className="profil-ganti-foto">Ganti Foto Profil</button>
              </div>
            </div>

            {/* FORM FIELDS */}
            <div className="profil-form-grid">
              <div className="profil-form-group">
                <label className="profil-label">Nama Lengkap</label>
                <input
                  type="text"
                  className="profil-input"
                  value={namaLengkap}
                  onChange={(e) => setNamaLengkap(e.target.value)}
                />
              </div>

              <div className="profil-form-group">
                <label className="profil-label">E-Mail</label>
                <input
                  type="email"
                  className="profil-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="profil-form-group profil-form-group-hp">
                <label className="profil-label">No. Hp</label>
                <div className="profil-hp-wrapper">
                  <select
                    className="profil-kode-negara"
                    value={kodeNegara}
                    onChange={(e) => setKodeNegara(e.target.value)}
                  >
                    <option value="+62">+62</option>
                    <option value="+1">+1</option>
                    <option value="+65">+65</option>
                  </select>
                  <input
                    type="tel"
                    className="profil-input"
                    value={noHp}
                    onChange={(e) => setNoHp(e.target.value)}
                  />
                </div>
              </div>

              <div className="profil-form-group">
                <label className="profil-label">Jenis Kelamin</label>
                <select
                  className="profil-input"
                  value={jenisKelamin}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                >
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Perempuan">Perempuan</option>
                  <option value="Laki-laki">Laki-laki</option>
                </select>
              </div>

              <div className="profil-form-group profil-form-group-full">
                <label className="profil-label">Password</label>
                <div className="profil-password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="profil-input"
                    placeholder="Kosongkan jika tidak ingin mengubah password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="profil-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
            </div>

            <div className="profil-form-actions">
              <button
                className="profil-btn-simpan"
                onClick={handleSimpan}
                disabled={isSaving}
              >
                {isSaving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}