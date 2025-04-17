import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUsers, FiFileText, FiClipboard } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import RoleManager from "./Auth/RoleManager";
import './AdminDashboard.css';
import QuestionManager from "./QuestionManager";
import ExamManager from "./ExamManager";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [keyword, setKeyword] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const navigate = useNavigate();

  // Kiểm tra nếu chưa đăng nhập thì chuyển về trang login
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    axios.get("http://localhost/WEBQUIZZ/Chucnang/dashboard_data.php")
      .then(res => setData(res.data))
      .catch(err => console.error("Lỗi khi tải dashboard data:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const barChartData = [
    { name: 'CN', điểm: 65 },
    { name: 'T2', điểm: 75 },
    { name: 'T3', điểm: 60 },
    { name: 'T4', điểm: 80 },
    { name: 'T5', điểm: 70 },
    { name: 'T6', điểm: 90 },
    { name: 'T7', điểm: 85 },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Logic tìm kiếm theo từ khóa và môn học
    // Bạn có thể sử dụng bộ lọc này trong các trang Quản lý câu hỏi và đề thi
    console.log("Tìm kiếm theo từ khóa:", keyword, "và môn học:", subjectFilter);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1>Admin Panel</h1>
        <ul>
          <li 
            className={currentPage === "dashboard" ? "active" : ""} 
            onClick={() => handlePageChange("dashboard")}
          >
            Dashboard
          </li>
          <li 
            className={currentPage === "questions" ? "active" : ""} 
            onClick={() => handlePageChange("questions")}
          >
            Quản lý câu hỏi
          </li>
          <li 
            className={currentPage === "exams" ? "active" : ""} 
            onClick={() => handlePageChange("exams")}
          >
            Quản lý đề thi
          </li>
          <li 
            className={currentPage === "roles" ? "active" : ""} 
            onClick={() => handlePageChange("roles")}
          >
            Quản lý nhóm quyền
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
      </aside>

      {/* Main Content */}
      <main className="main">
        {currentPage === "dashboard" && (
          <>
            <h1 className="welcome-text">Chào mừng trở lại!</h1>
            <form onSubmit={handleSearch} className="search-form">
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                className="search-input" 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
              />
              <select 
                value={subjectFilter} 
                onChange={(e) => setSubjectFilter(e.target.value)} 
                className="subject-filter"
              >
                <option value="">Chọn môn học</option>
                {/* Dynamic subjects could be added here */}
                <option value="math">Toán</option>
                <option value="science">Khoa học</option>
              </select>
              <button type="submit" className="search-btn">Tìm kiếm</button>
            </form>
            
            {/* Statistic Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="stat-card pink">
                <div>
                  <p className="stat-title">Người dùng</p>
                  <p className="stat-value">{data.users}</p>
                </div>
                <FiUsers className="stat-icon" />
              </div>
              <div className="stat-card indigo">
                <div>
                  <p className="stat-title">Câu hỏi</p>
                  <p className="stat-value">{data.cauhoi}</p>
                </div>
                <FiFileText className="stat-icon" />
              </div>
              <div className="stat-card blue">
                <div>
                  <p className="stat-title">Đề thi</p>
                  <p className="stat-value">{data.dethi}</p>
                </div>
                <FiClipboard className="stat-icon" />
              </div>
              <div className="stat-card green">
                <div>
                  <p className="stat-title">Chào Admin 👋</p>
                  <p className="text-sm">Chúc bạn một ngày làm việc hiệu quả!</p>
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
              <div className="dashboard-card bg-white p-4 rounded-lg shadow col-span-2">
                <h3 className="text-lg font-bold mb-2">Thống kê điểm trong tuần</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="điểm" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {currentPage === "questions" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <QuestionManager />
          </div>
        )}

        {currentPage === "exams" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <ExamManager />
          </div>
        )}

        {currentPage === "roles" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quản lý nhóm quyền</h2>
            <RoleManager />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
