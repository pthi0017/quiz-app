import { useState, useEffect } from "react";

export default function CreateExamPage() {
  const [ten, setTen] = useState("");
  const [mamonhoc, setMamonhoc] = useState("");
  const [thoigian, setThoigian] = useState(30);
  const [socau, setSocau] = useState(10);
  const [monhoc, setMonhoc] = useState([]);

  useEffect(() => {
    fetch("http://localhost/WEBQUIZZ/Chucnang/get_monhoc.php")
      .then(res => res.json())
      .then(data => setMonhoc(data));
  }, []);

  const handleSubmit = () => {
    fetch("http://localhost/WEBQUIZZ/Chucnang/create_dethi.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ten, mamonhoc, thoigian, socau }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) alert("Tạo đề thành công! Mã đề: " + data.macode);
      });
  };

  return (
    <div>
      <h2>Tạo đề thi</h2>
      <label>
        Tên đề thi:
        <input value={ten} onChange={(e) => setTen(e.target.value)} />
      </label><br />

      <label>
        Môn học:
        <select value={mamonhoc} onChange={(e) => setMamonhoc(e.target.value)}>
          <option>-- Chọn môn --</option>
          {monhoc.map(m => (
            <option key={m.mamonhoc} value={m.mamonhoc}>{m.tenmonhoc}</option>
          ))}
        </select>
      </label><br />

      <label>
        Thời gian làm bài (phút):
        <input type="number" value={thoigian} onChange={(e) => setThoigian(e.target.value)} />
      </label><br />

      <label>
        Số câu hỏi:
        <input type="number" value={socau} onChange={(e) => setSocau(e.target.value)} />
      </label><br />

      <button onClick={handleSubmit}>Tạo đề</button>
    </div>
  );
}
