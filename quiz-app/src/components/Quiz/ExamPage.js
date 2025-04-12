import { useEffect, useState } from "react";

export default function ExamPage({ userId, made }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`http://localhost/WEBQUIZZ/Chucnang/lay_cauhoi_de_thi.php?made=${made}`)
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, [made]);

  const handleSelect = (macauhoi, madapan) => {
    setAnswers(prev => ({ ...prev, [macauhoi]: madapan }));
  };

  const handleSubmit = async () => {
    const ansArray = Object.entries(answers).map(([macauhoi, madapan]) => ({
      macauhoi: parseInt(macauhoi),
      madapan
    }));

    const res = await fetch("http://localhost/WEBQUIZ/Chucnang/cham_diem.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, made, answers: ansArray })
    });
    const data = await res.json();
    setResult(data);
  };

  if (result) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">✅ Kết quả</h2>
        <p>Bạn trả lời đúng {result.correct} / {result.total} câu.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📘 Bài thi - Mã đề {made}</h2>
      {questions.map((q, i) => (
        <div key={q.macauhoi} className="mb-4">
          <p className="font-semibold">{i + 1}. {q.noidung}</p>
          {q.dapan.map(dap => (
            <div key={dap.madapan}>
              <label>
                <input
                  type="radio"
                  name={q.macauhoi}
                  value={dap.madapan}
                  checked={answers[q.macauhoi] === dap.madapan}
                  onChange={() => handleSelect(q.macauhoi, dap.madapan)}
                />
                {" "}{dap.noidung}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
        Nộp bài
      </button>
    </div>
  );
}
