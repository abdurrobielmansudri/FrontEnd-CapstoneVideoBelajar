// src/services/api.js
// Versi tanpa backend: data dari db.json + perubahan disimpan di localStorage
import db from '../../db.json';

const STORAGE_KEY = 'videobelajar_db_v1';

const loadStore = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (error) {
    console.error('Gagal membaca localStorage:', error);
  }
  return structuredClone(db);
};

const store = loadStore();

const persist = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch (error) {
    console.error('Gagal menyimpan ke localStorage:', error);
  }
};

const list = (name) => {
  if (!store[name]) store[name] = [];
  return store[name];
};

const newId = () => Math.random().toString(36).slice(2, 13);
const respond = (data) => Promise.resolve(structuredClone(data));

// 1. Ambil semua kursus
export const getCourses = async () => respond(list('courses'));

// 2. Cek login
export const loginUser = async (email, password) => {
  const foundUser = list('users').find(
    (user) => user.email === email && user.password === password
  );
  return respond(foundUser);
};

// 3. Daftar user baru
export const registerUser = async (userData) => {
  const user = { ...userData, id: newId() };
  list('users').push(user);
  persist();
  return respond(user);
};

// 4. Tambah kursus
export const addCourseAPI = async (courseData) => {
  const course = { ...courseData, id: newId() };
  list('courses').push(course);
  persist();
  return respond(course);
};

// 5. Update kursus
export const updateCourseAPI = async (id, courseData) => {
  const courses = list('courses');
  const index = courses.findIndex((c) => String(c.id) === String(id));
  if (index === -1) return null;
  courses[index] = { ...courseData, id: courses[index].id };
  persist();
  return respond(courses[index]);
};

// 6. Hapus kursus
export const deleteCourseAPI = async (id) => {
  store.courses = list('courses').filter((c) => String(c.id) !== String(id));
  persist();
  return id;
};

// 7. Detail 1 kursus
export const getCourseById = async (id) => {
  const course = list('courses').find((c) => String(c.id) === String(id));
  return respond(course ?? null);
};

// 8. Detail tutor
export const getTutorById = async (id) => {
  const tutor = list('tutors').find((t) => String(t.id) === String(id));
  return respond(tutor ?? null);
};

// 9. Simpan pesanan
export const createOrder = async (orderData) => {
  const order = { ...orderData, id: newId() };
  list('orders').push(order);
  persist();
  return respond(order);
};

// 10. Pesanan milik 1 user
export const getOrdersByUser = async (userId) =>
  respond(list('orders').filter((o) => String(o.user_id) === String(userId)));

// 11. Buat enrollment
export const createEnrollment = async (enrollmentData) => {
  const enrollment = { ...enrollmentData, id: newId() };
  list('enrollments').push(enrollment);
  persist();
  return respond(enrollment);
};

// 12. Enrollment milik 1 user
export const getEnrollmentsByUser = async (userId) =>
  respond(list('enrollments').filter((e) => String(e.user_id) === String(userId)));

// 13. Data 1 user
export const getUserById = async (id) => {
  const user = list('users').find((u) => String(u.id) === String(id));
  return respond(user ?? null);
};

// 14. Update sebagian data user
export const updateUserAPI = async (id, userData) => {
  const users = list('users');
  const index = users.findIndex((u) => String(u.id) === String(id));
  if (index === -1) return null;
  users[index] = { ...users[index], ...userData };
  persist();
  return respond(users[index]);
};