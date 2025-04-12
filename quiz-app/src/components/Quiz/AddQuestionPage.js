import { useState } from "react";

export default function AddQuestionPage() {
  const [noidung, setNoidung] = useState("");
  const [monhoc_id, setMonhocId] = useState("");
  const [capdo, setCapdo] = useState("1");
  const [loaicauhoi, setLoai] = useState("1");
  const [dapan_list, setDapanList] = useState([
    { noidung: "", is_correct: false },
    { noidung: "", is_correct: false },
    { noidung: "", is_correct: false },
    { noidung: "", is_correct: false },
  ]);

  const handleAdd = async () => {
    // 1. Gửi câu hỏi
    const res1 = await fetch("http://localhost/WEBQUIZZ/Chucnang/add_cauhoi.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noidung, monhoc_id, capdo, loaicauhoi }),
    });
    const data1 = await res1.json();

    if (!data1.success) return alert("Lỗi tạo câu hỏi!");

    // 2. Gửi đáp án
    const res2 = await fetch("http://localhost/WEBQUIZZ/Chucnang/add_dapan.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cauhoi_id: data1.cauhoi_id,
        dapan_list,
      }),
    });

    const data2 = await res2.json();
    if (data2.success) {
      alert("Thêm câu hỏi thành công!");
      setNoidung("");
      setDapanList([...Array(4)].map(() => ({ noidung: "", is_correct: false })));
    }
  };

  const handleDapAnChange = (index, key, value) => {
    const updated = [...dapan_list];
    updated[index][key] = value;
    setDapanList(updated);
  };

  return (
    <div>
      <h2>Thêm Câu Hỏi</h2>
      <textarea
        value={noidung}
        onChange={(e) => setNoidung(e.target.value)}
        placeholder="Nội dung câu hỏi"
      />
      <input
        type="text"
        placeholder="Môn học ID"
        value={monhoc_id}
        onChange={(e) => setMonhocId(e.target.value)}
      />
      <select value={capdo} onChange={(e) => setCapdo(e.target.value)}>
        <option value="1">Dễ</option>
        <option value="2">Trung bình</option>
        <option value="3">Khó</option>
      </select>
      <select value={loaicauhoi} onChange={(e) => setLoai(e.target.value)}>
        <option value="1">Một đáp án đúng</option>
        <option value="2">Nhiều đáp án đúng</option>
      </select>

      <h3>Đáp án</h3>
      {dapan_list.map((dapan, idx) => (
        <div key={idx}>
          <input
            value={dapan.noidung}
            onChange={(e) => handleDapAnChange(idx, "noidung", e.target.value)}
            placeholder={`Đáp án ${idx + 1}`}
          />
          <label>
            <input
              type="checkbox"
              checked={dapan.is_correct}
              onChange={(e) => handleDapAnChange(idx, "is_correct", e.target.checked)}
            />
            Đúng
          </label>
        </div>
      ))}

      <button onClick={handleAdd}>Thêm câu hỏi</button>
    </div>
  );
}
