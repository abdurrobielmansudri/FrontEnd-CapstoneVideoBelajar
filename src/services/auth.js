// src/services/auth.js
const KEY = "videobelajar_user";

export const saveCurrentUser = (user) => {
  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    photo_url: user.photo_url,
  };
  localStorage.setItem(KEY, JSON.stringify(safeUser));
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
};

export const clearCurrentUser = () => localStorage.removeItem(KEY);