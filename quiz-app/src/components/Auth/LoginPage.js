import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', matkhau: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost/WEBQUIZZ/Chucnang/login.php', form);
      if (res.data.success) {
        const user = res.data.user;
        localStorage.setItem('user', JSON.stringify(user));
        setMessage('Đăng nhập thành công');

        // 👉 Điều hướng theo quyền người dùng
        if (user.manhomquyen === '1') {
          navigate('/dashboard');
        } else {
          navigate('/exam');
        }

      } else {
        setMessage(res.data.message || 'Sai tài khoản hoặc mật khẩu');
      }
    } catch (err) {
      console.error(err);
      setMessage('Lỗi máy chủ');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4 font-bold">Đăng nhập</h2>
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        className="input w-full mb-2 p-2 border rounded"
      />
      <input
        name="matkhau"
        type="password"
        placeholder="Mật khẩu"
        onChange={handleChange}
        className="input w-full mb-2 p-2 border rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
      >
        Đăng nhập
      </button>

      <p className="mt-3">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Đăng ký
        </Link>
      </p>

      <p className="mt-2 text-red-500">{message}</p>
    </div>
  );
}
