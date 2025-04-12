import { useEffect, useState } from "react";

export default function PracticePage({ subjectId }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    fetch(`http://localhost/WEBQUIZZ/Chucnang/luyentap.php?mamonhoc=${subjectId}&limit=5`)
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, [subjectId]);

  const handleSelect = (macauhoi, macautl) => {
    setAnswers({ ...answers, [macauhoi]: macautl });
  };

  const handleSubmit = () => {
    fetch("http://localhost/WEBQUIZ/Chucnang/luu_kq_luyentap.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCorrectCount(data.correct);
        setSubmitted(true);
      });
  };

  return (
    <div>
      <h2>Luyện tập</h2>
      {questions.map((q, idx) => (
        <div key={q.macauhoi} style={{ marginBottom: "20px" }}>
          <p><strong>{idx + 1}. {q.noidung}</strong></p>
          {q.dapan.map((d) => (
            <label key={d.macautl}>
              <input
                type="radio"
                name={`q_${q.macauhoi}`}
                value={d.macautl}
                checked={answers[q.macauhoi] === d.macautl}
                onChange={() => handleSelect(q.macauhoi, d.macautl)}
              />{" "}
              {d.noidungtl}
              <br />
            </label>
          ))}
        </div>
      ))}

      {!submitted ? (
        <button onClick={handleSubmit}>Nộp bài</button>
      ) : (
        <h3>Bạn trả lời đúng {correctCount}/{questions.length} câu</h3>
      )}
    </div>
  );
}
