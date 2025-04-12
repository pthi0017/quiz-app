import { useEffect, useState } from "react";

export default function ExamHistory({ manguoidung }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost/WEBQUIZZ/Chucnang/xem_ketqua.php?manguoidung=${manguoidung}`)
      .then(res => res.json())
      .then(data => setHistory(data));
  }, [manguoidung]);

  return (
    <div>
      <h2>Lịch sử làm bài</h2>
      {history.length === 0 ? (
        <p>Chưa có bài thi nào.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Đề thi</th>
              <th>Điểm</th>
              <th>Ngày thi</th>
            </tr>
          </thead>
          <tbody>
            {history.map((kq, idx) => (
              <tr key={idx}>
                <td>{kq.tende}</td>
                <td>{kq.diem}</td>
                <td>{new Date(kq.ngaythi).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
