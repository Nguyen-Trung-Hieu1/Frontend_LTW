import React, { useState } from "react";
import axios from "axios";

function LoginRegister({ onLoginSuccess }) {
  // Gom tất cả các trường vào một object duy nhất
  const [formData, setFormData] = useState({
    login_name: "",
    password: ""
  });
  
  const [error, setError] = useState("");

  // Hàm xử lý thay đổi chung cho tất cả các ô input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,       // Giữ lại các giá trị cũ
      [name]: value      // Cập nhật giá trị mới dựa trên thuộc tính 'name' của input
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8081/admin/login",
        formData, // Gửi thẳng object formData sang backend
        { withCredentials: true }
      );

      if (response.status === 200) {
        onLoginSuccess(response.data);
      }
    } catch (err) {
      setError(err.response?.data || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="login-form-container">
      <h2>Vui lòng đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Tên đăng nhập:</label>
          <input
            type="text"
            name="login_name" // Tên phải khớp với key trong formData
            value={formData.login_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input
            type="password"
            name="password"    // Tên phải khớp với key trong formData
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

export default LoginRegister;