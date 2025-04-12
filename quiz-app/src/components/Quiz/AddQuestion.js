import { useEffect, useState } from "react";

export default function AddQuestion() {
  const [monhoc, setMonhoc] = useState([]);
  const [form, setForm] = useState({
    noidung: "", mamonhoc: "", machuong: "", mucdo: "",
    dapan: [{ noidungtl: "", ladapan: true }, { noidungtl: "" }, { noidungtl: "" }, { noidungtl: "" }]
  });

  useEffect(() => {
    fetch("http://localhost/WEBQUIZZ/Chucnang/get_monhoc.php")
      .then(res => res.json())
      .then(setMonhoc);
  }, []);

  const updateAnswer = (index, key, value) => {
    const newAnswers = [...form.dapan];
    if (key === "ladapan") {
      newAnswers.forEach((a, i) => (newAnswers[i].ladapan = false));
    }
    newAnswers[index][key] = value;
    setForm({ ...form, dapan: newAnswers });
  };

  const submit = () => {
    fetch("http://localhost/WEBQUIZ/Chucnang/add_cauhoi.php", {
      method: "POST",
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) alert("✅ Thêm thành công!");
        else alert("❌ Lỗi!");
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">➕ Thêm câu hỏi</h2>
      <textarea className="w-full mb-2 border p-2" rows="3"
        placeholder="Nội dung câu hỏi"
        value={form.noidung}
        onChange={e => setForm({ ...form, noidung: e.target.value })}
      />

      <div className="flex gap-2 mb-2">
        <select onChange={e => setForm({ ...form, mamonhoc: e.target.value })}>
          <option>-- Môn học --</option>
          {monhoc.map(m => (
            <option key={m.mamonhoc} value={m.mamonhoc}>{m.tenmonhoc}</option>
          ))}
        </select>
        <input type="number" placeholder="Chương" className="border p-1"
          onChange={e => setForm({ ...form, machuong: e.target.value })} />
        <select onChange={e => setForm({ ...form, mucdo: e.target.value })}>
          <option>Mức độ</option>
          <option value="Dễ">Dễ</option>
          <option value="Trung bình">Trung bình</option>
          <option value="Khó">Khó</option>
        </select>
      </div>

      <div className="mb-4">
        <p className="font-semibold">Các đáp án:</p>
        {form.dapan.map((dp, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <input
              type="radio"
              name="ladapan"
              checked={dp.ladapan || false}
              onChange={() => updateAnswer(i, "ladapan", true)}
            />
            <input
              type="text"
              className="flex-1 border p-1"
              placeholder={`Đáp án ${i + 1}`}
              value={dp.noidungtl}
              onChange={e => updateAnswer(i, "noidungtl", e.target.value)}
            />
          </div>
        ))}
      </div>

      <button onClick={submit} className="bg-green-500 text-white px-4 py-2 rounded">Lưu câu hỏi</button>
    </div>
  );
}
