import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { FiUsers, FiFileText, FiClipboard } from "react-icons/fi";
import RoleManager from "./Auth/RoleManager";
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");

  useEffect(() => {
    axios.get("http://localhost/WEBQUIZZ/Chucnang/dashboard_data.php")
      .then(res => setData(res.data))
      .catch(err => console.error("Lỗi khi tải dashboard data:", err))
      .finally(() => setLoading(false));
  }, []);

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
      {/* Sidebar */}
      <aside className="sidebar">
        <h1>Admin Panel</h1>
        <ul>
          <li onClick={() => setCurrentPage("dashboard")}>Dashboard</li>
          <li onClick={() => setCurrentPage("roles")}>Quản lý nhóm quyền</li>
        </ul>
        <button className="logout-btn">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="main">
        {currentPage === "dashboard" && (
          <>
            <h1 className="welcome-text">Chào mừng trở lại!</h1>
            <input type="text" placeholder="Tìm kiếm..." className="search-input" />

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

            {/* Charts & Top Users */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
              {/* Top Users */}
              <div className="dashboard-card bg-white p-4 rounded-lg shadow col-span-1">
                <h3 className="text-lg font-bold mb-2">Top 5 người dùng điểm cao</h3>
                <ul className="space-y-2">
                  {Array.isArray(data.topUsers) && data.topUsers.length > 0 ? (
                    data.topUsers.map((u, i) => (
                      <li key={i} className="text-sm border-b py-1">
                        <strong>{u.manguoidung}</strong> - {u.diemthi} điểm
                      </li>
                    ))
                  ) : (
                    <li>Không có dữ liệu người dùng.</li>
                  )}
                </ul>
              </div>

              {/* Bar Chart */}
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

        {/* Role Manager Page */}
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
