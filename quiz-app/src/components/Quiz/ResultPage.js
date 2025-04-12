import { useEffect, useState } from "react";

export default function ResultHistory({ userId }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`http://localhost/WEBQUIZZ/Chucnang/xem_ketqua.php?user_id=${userId}`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [userId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📊 Kết quả các bài thi</h2>
      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Tên đề</th>
            <th className="p-2">Ngày thi</th>
            <th className="p-2">Số câu đúng</th>
            <th className="p-2">Tổng câu</th>
          </tr>
        </thead>
        <tbody>
          {results.map(r => (
            <tr key={r.makq} className="border-t">
              <td className="p-2">{r.ten_de}</td>
              <td className="p-2">{new Date(r.ngaythi).toLocaleString()}</td>
              <td className="p-2">{r.socaudung}</td>
              <td className="p-2">{r.tongcau}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
