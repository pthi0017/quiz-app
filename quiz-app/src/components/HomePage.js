import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]); // Danh sách đề thi
  const [subjects, setSubjects] = useState([]); // Danh sách môn học
  const [selectedSubject, setSelectedSubject] = useState(null); // Môn học đã chọn
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Lấy dữ liệu đề thi và môn học
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examsRes, subjectsRes] = await Promise.all([
          axios.get("http://localhost/WEBQUIZZ/Chucnang/exams_list.php"),
          axios.get("http://localhost/WEBQUIZZ/Chucnang/subjects_list.php")
        ]);

        console.log(subjectsRes.data);  // Kiểm tra dữ liệu trả về từ API

        if (subjectsRes.data.success) {
          setExams(examsRes.data?.data || []);
          setSubjects(subjectsRes.data?.data || []);
        } else {
          setError(subjectsRes.data.message || "Không thể tải danh sách môn học.");
        }
      } catch (err) {
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Đang tải dữ liệu...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="homepage">
      {/* Menu điều hướng */}
      <nav className="homepage-nav">
        <ul className="menu">
          <li>
            <button className="menu-btn" onClick={() => navigate("/")}>
              Trang chủ
            </button>
          </li>
          <li className="dropdown">
            <button className="menu-btn">Luyện thi</button>
            <ul className="dropdown-menu">
              {subjects.map((subject) => (
                <li key={subject.mamonhoc}>
                  <button 
                    className="dropdown-item" 
                    onClick={() => navigate(`/exam/${subject.mamonhoc}`)}
                  >
                    {subject.tenmonhoc}
                  </button>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <button className="menu-btn" onClick={() => navigate("/login")}>
              Đăng nhập
            </button>
          </li>
          <li>
            <button className="menu-btn" onClick={() => navigate("/contact")}>
              Liên hệ
            </button>
          </li>
        </ul>
      </nav>

      {/* Header và chọn môn thi */}
      <header className="homepage-header">
        <h1>Chào mừng đến với Quiz App</h1>

        <div className="subject-select">
          <label>Chọn môn thi:</label>
          {subjects.length > 0 ? (
            <div className="subject-options">
              {subjects.map((subject) => (
                <div key={subject.mamonhoc} className="subject-option">
                  <input
                    type="radio"
                    id={`subject-${subject.mamonhoc}`}
                    name="subject"
                    value={subject.mamonhoc}
                    checked={selectedSubject === subject.mamonhoc}
                    onChange={() => setSelectedSubject(subject.mamonhoc)}
                  />
                  <label htmlFor={`subject-${subject.mamonhoc}`}>
                    {subject.tenmonhoc}
                  </label>
                </div>
              ))}
            </div>
          ) : (
            <p>Không có môn học nào</p>
          )}
        </div>

        <button className="btn start-btn" onClick={() => navigate(`/exam/${selectedSubject}`)}>
          Bắt đầu ngay
        </button>
      </header>
    </div>
  );
};

export default HomePage;
