import { useState, useEffect } from "react";

export default function CreateExam() {
  const [subjects, setSubjects] = useState([]);
  const [tenDe, setTenDe] = useState("");
  const [mon, setMon] = useState("");
  const [soCau, setSoCau] = useState("");

  useEffect(() => {
    fetch("http://localhost/WEBQUIZZ/Chucnang/get_monhoc.php")
      .then(res => res.json())
      .then(data => setSubjects(data));
  }, []);

  const handleCreate = async () => {
    const res = await fetch("http://localhost/WEBQUIZZ/Chucnang/create_dethi.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ten_de: tenDe, mamonhoc: mon, so_cauhoi: soCau }),
    });
    const data = await res.json();
    alert("Tạo đề thành công! Mã đề: " + data.made);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">📝 Tạo đề thi</h2>
      <input
        placeholder="Tên đề"
        className="border p-2 w-full mb-2"
        value={tenDe}
        onChange={e => setTenDe(e.target.value)}
      />
      <select
        className="border p-2 w-full mb-2"
        onChange={e => setMon(e.target.value)}
      >
        <option>-- Chọn môn học --</option>
        {subjects.map(mon => (
          <option key={mon.mamonhoc} value={mon.mamonhoc}>
            {mon.tenmon}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Số câu hỏi"
        className="border p-2 w-full mb-2"
        value={soCau}
        onChange={e => setSoCau(e.target.value)}
      />
      <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
        Tạo đề thi
      </button>
    </div>
  );
}
