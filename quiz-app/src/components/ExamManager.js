import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ExamManager.css';

const ExamManager = () => {
  const [exams, setExams] = useState([]); // Đảm bảo exams là mảng
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  // Tải danh sách môn học
  useEffect(() => {
    axios.get('http://localhost/WEBQUIZZ/Chucnang/get_monhoc.php')
      .then(res => {
        console.log(res.data);  // Kiểm tra dữ liệu trả về
        if (Array.isArray(res.data.data)) {  // Kiểm tra mảng dữ liệu trong trường 'data'
          setSubjects(res.data.data);  // Lưu dữ liệu môn học vào state
        } else {
          console.error('Dữ liệu môn học không hợp lệ:', res.data);
        }
      })
      .catch(err => console.error('Lỗi tải môn học:', err));
  }, []);

  // Tải danh sách đề thi
  const fetchExams = () => {
    axios.get('http://localhost/WEBQUIZZ/Chucnang/get_dethi.php', {
      params: { keyword, subject }
    })
      .then((response) => {
        if (Array.isArray(response.data)) {  // Kiểm tra nếu response là mảng
          setExams(response.data);  // Lưu dữ liệu đề thi vào state
        } else {
          console.error('Dữ liệu đề thi không hợp lệ:', response.data);
        }
      })
      .catch((error) => {
        console.error('Lỗi khi tải đề thi:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchExams();
  }, [keyword, subject]);

  // Xóa đề thi
  const deleteExam = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đề thi này?')) {
      axios.get(`http://localhost/WEBQUIZZ/Chucnang/delete_dethi.php?id=${id}`)
        .then(response => {
          if (response.data.status === 'success') {
            alert(response.data.message);
            setExams(exams.filter(e => e.madethi !== id));
          } else {
            alert('Xóa đề thi thất bại!');
          }
        })
        .catch(error => {
          console.error('Lỗi khi xóa đề thi:', error);
        });
    }
  };

  const addExam = () => {
    navigate('/add-exam');
  };

  if (loading) return <div>Đang tải đề thi...</div>;

  return (
    <div className="exam-manager">
      <h2>Quản lý Đề Thi</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Tìm theo tên đề thi..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="">Tất cả môn học</option>
          {subjects.map((s) => (
            <option key={s.mamonhoc} value={s.mamonhoc}>{s.tenmonhoc}</option>
          ))}
        </select>
      </div>

      <button onClick={addExam} className="add-exam-btn">Thêm Đề Thi</button>

      <table className="table">
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
                <button onClick={() => deleteExam(exam.madethi)} className="delete-btn">
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
