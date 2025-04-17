import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddQuestion.css';

const AddQuestion = () => {
  const [formData, setFormData] = useState({
    noidung: '',
    dokho: '',
    mamonhoc: '',
    machuong: '',
  });

  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  // Fetch subjects on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost/WEBQUIZZ/Chucnang/get_monhoc.php');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setMessage({ text: '❌ Lỗi khi tải danh sách môn học', type: 'error' });
      }
    };
    fetchSubjects();
  }, []);

  // Fetch chapters when subject changes
  useEffect(() => {
    if (formData.mamonhoc) {
      const fetchChapters = async () => {
        try {
          const response = await axios.get(
            `http://localhost/WEBQUIZZ/Chucnang/get_chuong.php?mamonhoc=${formData.mamonhoc}`
          );
          setChapters(response.data);
          // Reset chapter selection when subject changes
          setFormData(prev => ({ ...prev, machuong: '' }));
        } catch (error) {
          console.error('Error fetching chapters:', error);
          setMessage({ text: '❌ Lỗi khi tải danh sách chương', type: 'error' });
        }
      };
      fetchChapters();
    } else {
      setChapters([]);
    }
  }, [formData.mamonhoc]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.noidung || !formData.dokho || !formData.mamonhoc || !formData.machuong) {
      setMessage({ text: '❌ Vui lòng điền đầy đủ thông tin', type: 'error' });
      return false;
    }

    if (formData.noidung.length < 10) {
      setMessage({ text: '❌ Nội dung câu hỏi quá ngắn (tối thiểu 10 ký tự)', type: 'error' });
      return false;
    }

    if (formData.dokho < 1 || formData.dokho > 5) {
      setMessage({ text: '❌ Độ khó phải từ 1 đến 5', type: 'error' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost/WEBQUIZZ/Chucnang/add_cauhoi.php',
        formData,
        { withCredentials: true }
      );

      if (response.data.status === 'success') {
        setMessage({ text: '✅ ' + response.data.message, type: 'success' });
        setFormData({ noidung: '', dokho: '', mamonhoc: '', machuong: '' });
      } else {
        setMessage({ text: '❌ ' + response.data.message, type: 'error' });
      }
    } catch (error) {
      console.error('Error adding question:', error);
      setMessage({ 
        text: '❌ ' + (error.response?.data?.message || 'Lỗi kết nối đến máy chủ'), 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ noidung: '', dokho: '', mamonhoc: '', machuong: '' });
    setMessage({ text: '', type: '' });
  };

  return (
    <div className="add-question-form">
      <h2>Thêm Câu Hỏi Mới</h2>

      {message.text && (
        <div className={`message ${message.type}-message`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nội dung câu hỏi:</label>
          <textarea
            name="noidung"
            value={formData.noidung}
            onChange={handleChange}
            required
            maxLength="500"
            rows="5"
          />
          <div className="char-counter">
            {formData.noidung.length}/500 ký tự
          </div>
        </div>

        <div className="form-group">
          <label>Độ khó (1-5):</label>
          <input
            type="number"
            name="dokho"
            value={formData.dokho}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </div>

        <div className="form-group">
          <label>Môn học:</label>
          <select
            name="mamonhoc"
            value={formData.mamonhoc}
            onChange={handleChange}
            required
          >
            <option value="">Chọn môn học</option>
            {subjects.map(subject => (
              <option key={subject.mamonhoc} value={subject.mamonhoc}>
                {subject.tenmonhoc}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Chương:</label>
          <select
            name="machuong"
            value={formData.machuong}
            onChange={handleChange}
            required
            disabled={!formData.mamonhoc || chapters.length === 0}
          >
            <option value="">Chọn chương</option>
            {chapters.map(chapter => (
              <option key={chapter.machuong} value={chapter.machuong}>
                {chapter.tenchuong}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className={`button primary ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Đang thêm...' : 'Thêm Câu Hỏi'}
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={resetForm}
          >
            Xóa Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;