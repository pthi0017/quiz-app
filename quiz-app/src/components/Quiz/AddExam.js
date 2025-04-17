import React, { useState } from "react";
import axios from "axios";
import './AddExam.css';  // Make sure this path is correct

const AddExam = () => {
  const [formData, setFormData] = useState({
    tende: "",
    thoigiantao: "",
    thoigianthi: "",
    thoigianketthuc: "",
    trangthai: 1, // mặc định là hoạt động
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost/WEBQUIZ/Chucnang/add_dethi.php", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Lỗi khi thêm đề thi.");
      console.error(error);
    }
  };

  return (
    <div className="add-exam-container"> {/* Apply the CSS class here */}
      <h2 className="text-2xl font-bold mb-4">Thêm Đề Thi</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Tên đề thi:</label>
          <input
            type="text"
            name="tende"
            value={formData.tende}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">Thời gian tạo (yyyy-mm-dd hh:mm:ss):</label>
          <input
            type="text"
            name="thoigiantao"
            value={formData.thoigiantao}
            onChange={handleChange}
            placeholder="2025-04-15 10:00:00"
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">Thời gian thi (giây):</label>
          <input
            type="number"
            name="thoigianthi"
            value={formData.thoigianthi}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">Thời gian kết thúc (giây):</label>
          <input
            type="number"
            name="thoigianketthuc"
            value={formData.thoigianketthuc}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block">Trạng thái (1: hoạt động, 0: ẩn):</label>
          <input
            type="number"
            name="trangthai"
            value={formData.trangthai}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thêm đề thi
        </button>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default AddExam;
