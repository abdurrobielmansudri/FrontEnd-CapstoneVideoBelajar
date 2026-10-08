// src/services/api.js
import axios from 'axios';

// Membuat instance Axios dengan baseURL dari file .env (Vite)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 1. Fungsi untuk Mengambil Data Courses (GET)
export const getCourses = async () => {
  try {
    const response = await API.get('/courses');
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data kursus:', error);
    return [];
  }
};

// 2. Fungsi untuk Cek Login User (GET)
export const loginUser = async (email, password) => {
  try {
    const response = await API.get('/users');
    const users = response.data;

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    return foundUser;
  } catch (error) {
    console.error('Gagal melakukan login:', error);
    return null;
  }
};

// 3. Fungsi untuk Mendaftarkan User Baru (POST)
export const registerUser = async (userData) => {
  try {
    const response = await API.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Gagal melakukan registrasi:', error);
    return null;
  }
};

// 4. Tambah Kursus Baru (POST)
export const addCourseAPI = async (courseData) => {
  try {
    const response = await API.post('/courses', courseData);
    return response.data;
  } catch (error) {
    console.error('Gagal menambah kursus:', error);
    return null;
  }
};

// 5. Update Kursus (PUT)
export const updateCourseAPI = async (id, courseData) => {
  try {
    const response = await API.put(`/courses/${id}`, courseData);
    return response.data;
  } catch (error) {
    console.error('Gagal memperbarui kursus:', error);
    return null;
  }
};

// 6. Hapus Kursus (DELETE)
export const deleteCourseAPI = async (id) => {
  try {
    await API.delete(`/courses/${id}`);
    return id;
  } catch (error) {
    console.error('Gagal menghapus kursus:', error);
    return null;
  }
};
// 7. Fungsi untuk Mengambil Detail 1 Kursus berdasarkan ID (GET)
export const getCourseById = async (id) => {
  try {
    const response = await API.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil detail kursus:', error);
    return null;
  }
};

// 8. Fungsi untuk Mengambil Detail Tutor berdasarkan ID (GET)
export const getTutorById = async (id) => {
  try {
    const response = await API.get(`/tutors/${id}`);
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data tutor:', error);
    return null;
  }
};

// 9. Simpan Pesanan Baru (POST)
export const createOrder = async (orderData) => {
  try {
    const response = await API.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Gagal menyimpan pesanan:', error);
    return null;
  }
};

// 10. Ambil Pesanan milik 1 User (GET)
export const getOrdersByUser = async (userId) => {
  try {
    const response = await API.get('/orders', { params: { user_id: userId } });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil pesanan:', error);
    return [];
  }
};

// 11. (Opsional) Daftarkan user ke kelas setelah bayar (POST)
export const createEnrollment = async (enrollmentData) => {
  try {
    const response = await API.post('/enrollments', enrollmentData);
    return response.data;
  } catch (error) {
    console.error('Gagal membuat enrollment:', error);
    return null;
  }
};

// 12. Ambil Enrollment (kelas yang dibeli) milik 1 User (GET)
export const getEnrollmentsByUser = async (userId) => {
  try {
    const response = await API.get('/enrollments', { params: { user_id: userId } });
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil kelas saya:', error);
    return [];
  }
};

// 13. Ambil data 1 User berdasarkan ID (GET)
export const getUserById = async (id) => {
  try {
    const response = await API.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data user:', error);
    return null;
  }
};

// 14. Update sebagian data User (PATCH)
export const updateUserAPI = async (id, userData) => {
  try {
    const response = await API.patch(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Gagal memperbarui profil:', error);
    return null;
  }
};