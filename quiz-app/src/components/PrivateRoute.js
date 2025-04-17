import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  // Kiểm tra token và quyền người dùng
  if (!user || !user.manhomquyen || user.manhomquyen !== 1) {
    return <Navigate to="/login" />;
  }

  return children; // Nếu người dùng hợp lệ, cho phép truy cập vào trang
};

export default PrivateRoute;
