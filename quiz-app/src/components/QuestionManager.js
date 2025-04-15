import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

const QuestionManager = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Lấy danh sách câu hỏi
  useEffect(() => {
    axios.get('http://localhost/WEBQUIZZ/Chucnang/get_cauhoi.php')
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi tải câu hỏi:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Xóa câu hỏi
  const deleteQuestion = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
      axios.get(`http://localhost/WEBQUIZZ/Chucnang/delete_cauhoi.php?id=${id}`)
        .then(response => {
          if (response.data.status === 'success') {
            alert(response.data.message);
            setQuestions(questions.filter(q => q.macauhoi !== id)); // Xóa câu hỏi khỏi state
          } else {
            alert('Xóa câu hỏi thất bại!');
          }
        })
        .catch(error => {
          console.error('Lỗi khi xóa câu hỏi:', error);
        });
    }
  };

  // Thêm câu hỏi (Có thể thêm một form để nhập câu hỏi mới)
  const addQuestion = () => {
    // Hiện thị form thêm câu hỏi
    // Sau khi thêm câu hỏi thành công, gọi lại axios.get để tải lại danh sách câu hỏi
  };

  if (loading) {
    return <div>Đang tải câu hỏi...</div>;
  }

  return (
    <div>
      <h2>Quản lý Câu Hỏi</h2>
      <button onClick={addQuestion} className="btn btn-primary">Thêm Câu Hỏi</button>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nội Dung</th>
            <th>Độ Khó</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.macauhoi}>
              <td>{question.macauhoi}</td>
              <td>{question.noidung}</td>
              <td>{question.dokho}</td>
              <td>
                <button onClick={() => deleteQuestion(question.macauhoi)} className="btn btn-danger">
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

export default QuestionManager;
