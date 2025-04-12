import { useEffect, useState } from "react";

export default function PracticeHistory({ userId }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost/WEBQUIZZ/Chucnang/xem_lichsu_luyentap.php?user_id=${userId}`)
      .then(res => res.json())
      .then(data => setHistory(data));
  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📜 Lịch sử luyện tập</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Môn học</th>
            <th className="p-2 border">Số câu đúng</th>
            <th className="p-2 border">Tổng số câu</th>
            <th className="p-2 border">Điểm</th>
            <th className="p-2 border">Ngày luyện</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h, idx) => (
            <tr key={idx} className="text-center">
              <td className="border p-2">{h.tenmon}</td>
              <td className="border p-2">{h.socaudung}</td>
              <td className="border p-2">{h.tongcau}</td>
              <td className="border p-2">{h.diem}</td>
              <td className="border p-2">{new Date(h.ngayluyentap).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
