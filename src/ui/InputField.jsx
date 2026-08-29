// src/ui/InputField.jsx
import React from 'react';

// Ini adalah cetakan input yang dinamis menggunakan Props
function InputField({ label, type = "text", id, placeholder, required = false, value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;