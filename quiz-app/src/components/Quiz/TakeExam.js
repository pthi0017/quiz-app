import { useState, useEffect } from "react";

export default function TakeExam({ madethi, userId }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch(`http://localhost/WEBQUIZZ/Chucnang/lay_cauhoi_de_thi.php?madethi=${madethi}`)
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, [madethi]);

  const handleSelect = (macauhoi, madapan) => {
    setAnswers(prev => ({ ...prev, [macauhoi]: madapan }));
  };

  const handleSubmit = () => {
    const payload = {
      madethi,
      user_id: userId,
      answers: Object.entries(answers).map(([macauhoi, madapan]) => ({
        macauhoi,
        madapan
      }))
    };

    fetch("http://localhost/WEBQUIZ/Chucnang/cham_diem.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        alert(`Bạn đã đạt: ${data.diem} điểm`);
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Bài thi</h2>
      {questions.map((q, idx) => (
        <div key={q.macauhoi} className="mb-4">
          <p className="font-semibold">{idx + 1}. {q.cauhoi}</p>
          {q.dapan.map(d => (
            <label key={d.madapan} className="block">
              <input
                type="radio"
                name={`q_${q.macauhoi}`}
                value={d.madapan}
                onChange={() => handleSelect(q.macauhoi, d.madapan)}
              /> {d.noidung}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 mt-4">
        Nộp bài
      </button>
    </div>
  );
}
