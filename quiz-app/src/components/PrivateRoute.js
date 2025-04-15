import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Lấy thông tin người dùng từ localStorage và kiểm tra
  const user = JSON.parse(localStorage.getItem('user'));

  // Kiểm tra nếu không có user trong localStorage
  if (!user) {
    // Nếu không có user, chuyển hướng đến trang login
    return <Navigate to="/login" />;
  }

  // Nếu có user và bạn cần kiểm tra quyền của người dùng (ví dụ là admin)
  // Thêm logic kiểm tra role nếu cần
  // if (user.role !== 'admin') {
  //   return <Navigate to="/not-authorized" />;
  // }

  return children; // Nếu đã có user, hiển thị nội dung
};

export default PrivateRoute;
