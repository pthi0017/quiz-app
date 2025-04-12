import { useEffect, useState } from "react";

export default function ResultHistoryPage({ userId }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`http://localhost/WEBQUIZZ/Chucnang/xem_ketqua.php?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, [userId]);

  return (
    <div>
      <h2>Lịch Sử Làm Bài</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Môn học</th>
            <th>Đề thi</th>
            <th>Số câu đúng</th>
            <th>Tổng số câu</th>
            <th>Ngày thi</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, idx) => (
            <tr key={idx}>
              <td>{r.ten_monhoc}</td>
              <td>{r.tieude}</td>
              <td>{r.so_dung}</td>
              <td>{r.tong_so}</td>
              <td>{new Date(r.thoigian).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
