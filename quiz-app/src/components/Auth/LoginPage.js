import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './LoginPage.css';

const api = axios.create({
  baseURL: 'http://localhost/WEBQUIZZ/Chucnang/',
  withCredentials: true, // Đảm bảo rằng cookie được gửi cùng với yêu cầu
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', matkhau: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [csrfReady, setCsrfReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await api.get('csrf.php');
        api.defaults.headers.common['X-CSRF-TOKEN'] = response.data.token;
        setCsrfReady(true);
      } catch (error) {
        console.error("Lỗi khi lấy CSRF token:", error);
        setMessage({ 
          text: 'Không thể kết nối đến server. Vui lòng thử lại sau.', 
          type: 'error' 
        });
        api.defaults.headers.common['X-CSRF-TOKEN'] = 'fallback-token-' + Date.now();
        setCsrfReady(true);
      }
    };

    fetchCsrfToken();

    return () => {
      api.defaults.headers.common['X-CSRF-TOKEN'] = null;
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!csrfReady) {
      setMessage({ 
        text: 'Hệ thống đang khởi tạo bảo mật. Vui lòng thử lại sau giây lát.', 
        type: 'error' 
      });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMessage({ text: 'Vui lòng nhập email hợp lệ', type: 'error' });
      setLoading(false);
      return;
    }

    if (!form.matkhau || form.matkhau.length < 6) {
      setMessage({ text: 'Mật khẩu phải có ít nhất 6 ký tự', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const res = await api.post('login.php', JSON.stringify(form), {
        headers: {
          'X-CSRF-TOKEN': api.defaults.headers.common['X-CSRF-TOKEN'],
        }
      });

      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        
        setMessage({ text: 'Đăng nhập thành công', type: 'success' });

        setTimeout(() => {
          if (res.data.user.manhomquyen === 1) {
            navigate('/dashboard');
          } else {
            navigate('/');
          }
        }, 1000);
      } else {
        setMessage({ 
          text: res.data.message || 'Email hoặc mật khẩu không đúng', 
          type: 'error' 
        });
      }
    } catch (err) {
      setMessage({ text: 'Lỗi kết nối máy chủ', type: 'error' });
      console.error("Lỗi chi tiết:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Đăng nhập</h2>
        {message.text && (
          <div className={`message ${message.type}`}>
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
            autoFocus
          />
          <input
            name="matkhau"
            type="password"
            value={form.matkhau}
            onChange={handleChange}
            placeholder="Mật khẩu"
            className="input-field"
            required
            minLength="6"
          />
          <button 
            type="submit" 
            className={`login-btn ${loading ? 'loading' : ''}`} 
            disabled={loading || !csrfReady}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Đang đăng nhập...
              </>
            ) : 'Đăng nhập'}
          </button>
        </form>
        <div className="register-link">
          <p>Chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link></p>
          <p><Link to="/forgot-password">Quên mật khẩu?</Link></p>
        </div>
      </div>
    </div>
  );
}
