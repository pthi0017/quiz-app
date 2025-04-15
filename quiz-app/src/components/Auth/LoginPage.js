import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', matkhau: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Dùng useNavigate để chuyển hướng

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    if (!form.email || !form.matkhau) {
      setMessage({ text: 'Vui lòng nhập email và mật khẩu', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost/WEBQUIZZ/Chucnang/login.php', form, {
        headers: { 'Content-Type': 'application/json' },
      });

      let data = res.data;

      // Nếu backend trả về chuỗi JSON -> chuyển sang object
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }

      if (data.success) {
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage({ text: 'Đăng nhập thành công', type: 'success' });

        // Chuyển hướng trang sau khi đăng nhập thành công
        setTimeout(() => {
          // Chuyển hướng đến trang Admin nếu là admin, trang chủ nếu là user
          if (data.user.manhomquyen === 1) {
            navigate('/dashboard'); // Admin dashboard
          } else {
            navigate('/'); // Trang chính cho user
          }
        }, 1000);
      } else {
        setMessage({ text: data.message || 'Sai email hoặc mật khẩu', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: 'Lỗi kết nối máy chủ', type: 'error' });
      console.error("Lỗi:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Đăng nhập</h2>
        {message.text && (
          <div className={`message ${message.type === 'error' ? 'error' : 'success'}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="input-field"
            required
          />
          <input
            name="matkhau"
            type="password"
            value={form.matkhau}
            onChange={handleChange}
            placeholder="Mật khẩu"
            className="input-field"
            required
          />
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
        <div className="register-link">
          <p>Chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link></p>
        </div>
      </div>
    </div>
  );
}
