import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import './RegisterPage.css'; 

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [hoten, setHoten] = useState("");
  const [matkhau, setMatkhau] = useState("");
  const [ngaysinh, setNgaysinh] = useState("");
  const [gioitinh, setGioitinh] = useState(""); 
  const [sodienthoai, setSodienthoai] = useState("");
  const [manhomquyen] = useState(2);  
  const [trangthai] = useState(1);  
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const userData = { email, hoten, matkhau, ngaysinh, gioitinh, sodienthoai, manhomquyen, trangthai };

    try {
      const response = await axios.post("http://localhost/WEBQUIZZ/Chucnang/register.php", userData);
      if (response.data.status === "success") {
        setSuccessMessage("🎉 Đăng ký thành công!");
        setEmail("");
        setHoten("");
        setMatkhau("");
        setNgaysinh("");
        setGioitinh("");
        setSodienthoai("");

        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setErrorMessage(error.response?.status === 409 ? "⚠️ Email này đã được sử dụng." : "❌ Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="register-form-container">
      <h2>Đăng ký tài khoản</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="email" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Họ và tên *" value={hoten} onChange={(e) => setHoten(e.target.value)} required />
        <input type="password" placeholder="Mật khẩu *" value={matkhau} onChange={(e) => setMatkhau(e.target.value)} required />
        <input type="date" placeholder="Ngày sinh" value={ngaysinh} onChange={(e) => setNgaysinh(e.target.value)} />
        <select value={gioitinh} onChange={(e) => setGioitinh(e.target.value)}>
          <option value="">Chọn giới tính</option>
          <option value="0">Nữ</option>
          <option value="1">Nam</option>
        </select>
        <input type="text" placeholder="Số điện thoại" value={sodienthoai} onChange={(e) => setSodienthoai(e.target.value)} />
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}
