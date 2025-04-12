import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
  const [form, setForm] = useState({
    hoten: '',
    email: '',
    matkhau: '',
    ngaysinh: '',
    gioitinh: '',
    sodienthoai: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      console.log(form); // Debug: kiểm tra dữ liệu gửi đi
      const res = await axios.post('http://localhost/WEBQUIZZ/Chucnang/register.php', form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.data.status === 'success') {
        setMessage('Đăng ký thành công! Hãy đăng nhập.');
        setForm({
          hoten: '',
          email: '',
          matkhau: '',
          ngaysinh: '',
          gioitinh: '',
          sodienthoai: '',
        });
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      console.error(err); // In lỗi chi tiết
      setMessage('Lỗi kết nối máy chủ');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto shadow rounded bg-white">
      <h2 className="text-2xl mb-4 font-bold">Đăng ký tài khoản</h2>

      <input name="hoten" value={form.hoten} onChange={handleChange} placeholder="Họ tên" className="input mb-2 w-full p-2 border rounded" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input mb-2 w-full p-2 border rounded" />
      <input name="matkhau" value={form.matkhau} onChange={handleChange} type="password" placeholder="Mật khẩu" className="input mb-2 w-full p-2 border rounded" />
      <input name="ngaysinh" value={form.ngaysinh} onChange={handleChange} type="date" className="input mb-2 w-full p-2 border rounded" />
      <select name="gioitinh" value={form.gioitinh} onChange={handleChange} className="input mb-2 w-full p-2 border rounded">
        <option value="">Chọn giới tính</option>
        <option value="1">Nam</option>
        <option value="0">Nữ</option>
      </select>
      <input name="sodienthoai" value={form.sodienthoai} onChange={handleChange} placeholder="Số điện thoại" className="input mb-4 w-full p-2 border rounded" />

      <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Đăng ký
      </button>

      <p className="mt-3 text-red-500">{message}</p>

      <div className="mt-4 text-center">
        <p className="text-gray-600">Đã có tài khoản?</p>
        <Link to="/login" className="text-blue-500 hover:underline">
          Đăng nhập tại đây
        </Link>
      </div>
    </div>
  );
}
