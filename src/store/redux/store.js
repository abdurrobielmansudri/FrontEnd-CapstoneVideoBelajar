// src/store/redux/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    list: [],
  },
  reducers: {
    setCourses: (state, action) => {
      state.list = action.payload;
    },
    addCourse: (state, action) => {
      state.list.unshift(action.payload);
    },
    updateCourse: (state, action) => {
      const index = state.list.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteCourse: (state, action) => {
      state.list = state.list.filter(course => course.id !== action.payload);
    },
  },
});

export const { setCourses, addCourse, updateCourse, deleteCourse } = courseSlice.actions;

export const store = configureStore({
  reducer: {
    courses: courseSlice.reducer,
  },
});