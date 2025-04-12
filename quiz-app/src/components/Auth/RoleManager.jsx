import React from 'react';
import './AdminDashboard.css';

const RoleManager = () => {
  return (
    <div className="role-manager-container">
      <h2 className="rm-title">Quản lý vai trò người dùng</h2>
      <div className="rm-grid-container">
        
        {/* Form thêm vai trò */}
        <div className="rm-card p-4 shadow dashboard-card">
          <h3 className="text-lg font-semibold mb-2">Thêm vai trò mới</h3>
          <form className="rm-form">
            <input
              type="text"
              placeholder="Tên vai trò"
              className="rm-form-input"
            />
            <button type="submit" className="rm-form-btn">Thêm</button>
          </form>
        </div>

        {/* Danh sách vai trò */}
        <div className="rm-card p-4 shadow dashboard-card">
          <h3 className="text-lg font-semibold mb-2">Danh sách vai trò</h3>
          <ul className="rm-role-list">
            <li className="rm-role-item">
              <span>Admin</span>
              <div className="rm-actions">
                <button>Sửa</button>
                <button>Xóa</button>
              </div>
            </li>
            <li className="rm-role-item">
              <span>Người dùng</span>
              <div className="rm-actions">
                <button>Sửa</button>
                <button>Xóa</button>
              </div>
            </li>
            {/* Thêm các item khác từ database */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoleManager;
