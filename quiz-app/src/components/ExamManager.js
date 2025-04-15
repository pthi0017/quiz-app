import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

const ExamManager = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy danh sách đề thi
  useEffect(() => {
    axios.get('http://localhost/WEBQUIZZ/Chucnang/get_dethi.php')
      .then((response) => {
        console.log('Dữ liệu đề thi:', response.data); // Kiểm tra dữ liệu API
        setExams(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi tải đề thi:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  // Xóa đề thi
  const deleteExam = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đề thi này?')) {
      axios.get(`http://localhost/WEBQUIZZ/Chucnang/delete_dethi.php?id=${id}`)
        .then(response => {
          if (response.data.status === 'success') {
            alert(response.data.message);
            setExams(exams.filter(e => e.madethi !== id)); // Xóa đề thi khỏi state
          } else {
            alert('Xóa đề thi thất bại!');
          }
        })
        .catch(error => {
          console.error('Lỗi khi xóa đề thi:', error);
        });
    }
  };

  // Thêm đề thi (Có thể thêm một form để nhập thông tin đề thi mới)
  const addExam = () => {
    // Hiện thị form thêm đề thi
    // Sau khi thêm đề thi thành công, gọi lại axios.get để tải lại danh sách đề thi
  };

  if (loading) {
    return <div>Đang tải đề thi...</div>;
  }

  return (
    <div>
      <h2>Quản lý Đề Thi</h2>
      <button onClick={addExam} className="btn btn-primary">Thêm Đề Thi</button>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Đề Thi</th>
            <th>Thời Gian Tạo</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.madethi}>
              <td>{exam.madethi}</td>
              <td>{exam.tende}</td>
              <td>{exam.thoigiantao}</td>
              <td>
                <button onClick={() => deleteExam(exam.madethi)} className="btn btn-danger">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamManager;
