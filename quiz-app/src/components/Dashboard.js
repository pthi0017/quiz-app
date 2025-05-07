import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUsers, FiFileText } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import './AdminDashboard.css';
import QuestionManager from "./QuestionManager";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [subjectFilter, setSubjectFilter] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const navigate = useNavigate();

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

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get('http://localhost/WEBQUIZZ/chucnang/search_cauhoi.php', {
      params: { subject: subjectFilter }
    })
    .then(res => {
      if (res.data.success) {
        setFilteredQuestions(res.data.data);
      } else {
        alert('Không có câu hỏi nào phù hợp');
        setFilteredQuestions([]);
      }
    })
    .catch(err => {
      alert('Lỗi khi tìm kiếm');
      console.error(err);
    });
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

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1>Admin Panel</h1>
        <ul>
          <li className={currentPage === "dashboard" ? "active" : ""} onClick={() => setCurrentPage("dashboard")}>Dashboard</li>
          <li className={currentPage === "questions" ? "active" : ""} onClick={() => setCurrentPage("questions")}>Quản lý câu hỏi</li>
          <button className="logout-btnn" onClick={handleLogout}>Đăng xuất</button>
        </ul>
      </aside>

      <main className="main">
        {currentPage === "dashboard" && (
          <>
            <h1 className="welcome-text">Chào mừng trở lại!</h1>
            <form onSubmit={handleSearch} className="search-form">
              <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="subject-filter">
                <option value="">Tất cả môn học</option>
                <option value="Toán">Toán</option>
                <option value="Khoa học">Khoa học</option>
                <option value="Lịch sử">Lịch sử</option>
              </select>
              <button type="submit" className="search-btn">Tìm kiếm</button>
            </form>

            {filteredQuestions.length > 0 && (
              <div className="question-list">
                <h3 className="text-lg font-bold mb-4">Danh sách câu hỏi:</h3>
                <ul>
                  {filteredQuestions.map((question, index) => (
                    <li key={index} className="question-item">
                      {question.content}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="stat-card pink">
                <p className="stat-title">Người dùng</p>
                <p className="stat-value">{data.users}</p>
                <FiUsers className="stat-icon" />
              </div>
              <div className="stat-card indigo">
                <p className="stat-title">Câu hỏi</p>
                <p className="stat-value">{data.cauhoi}</p>
                <FiFileText className="stat-icon" />
              </div>
            </div>
          </>
        )}

        {currentPage === "questions" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <QuestionManager filteredQuestions={filteredQuestions} />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
