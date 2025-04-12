import { useEffect, useState } from "react";

export default function PracticeMode({ userId }) {
  const [monhoc, setMonhoc] = useState([]);
  const [selected, setSelected] = useState({ mamonhoc: "", machuong: "" });
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("http://localhost/WEBQUIZ/Chucnang/get_monhoc.php")
      .then((res) => res.json())
      .then((data) => setMonhoc(data))
      .catch((err) => console.error("Lỗi khi tải môn học:", err));
  }, []);

  const loadQuestions = () => {
    const { mamonhoc, machuong } = selected;
    if (!mamonhoc) {
      alert("⚠️ Vui lòng chọn môn học trước!");
      return;
    }

    let url = `http://localhost/WEBQUIZZ/Chucnang/luyentap.php?mamonhoc=${mamonhoc}`;
    if (machuong) url += `&machuong=${machuong}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setAnswers({});
        setSubmitted(false);
      })
      .catch((err) => console.error("Lỗi khi tải câu hỏi:", err));
  };

  const handleAnswer = (macauhoi, dapanId) => {
    setAnswers((prev) => ({ ...prev, [macauhoi]: dapanId }));
  };

  const submitPractice = () => {
    const ketqua = questions.map((q) => {
      const picked = answers[q.macauhoi];
      const correct = q.dapan.find((d) => d.ladapan === "1");
      return {
        macauhoi: q.macauhoi,
        dapan_id: picked,
        isCorrect: picked === correct?.macautl,
      };
    });

    fetch("http://localhost/WEBQUIZ/Chucnang/luu_kq_luyentap.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, ketqua }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`✅ Bạn làm đúng ${data.socaudung}/${data.tong}`);
        setSubmitted(true);
      })
      .catch((err) => console.error("Lỗi khi lưu kết quả:", err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📝 Chế độ luyện tập</h2>

      <div className="flex gap-2 mb-4">
        <select
          value={selected.mamonhoc}
          onChange={(e) =>
            setSelected({ ...selected, mamonhoc: e.target.value })
          }
        >
          <option value="">-- Chọn môn học --</option>
          {monhoc.map((m) => (
            <option key={m.mamonhoc} value={m.mamonhoc}>
              {m.tenmonhoc}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Chương (tuỳ chọn)"
          value={selected.machuong}
          onChange={(e) =>
            setSelected({ ...selected, machuong: e.target.value })
          }
        />
        <button
          onClick={loadQuestions}
          className="bg-blue-500 text-white px-3 rounded"
        >
          Bắt đầu
        </button>
      </div>

      {questions.length > 0 && (
        <div>
          {questions.map((q, i) => (
            <div
              key={q.macauhoi}
              className="mb-4 border p-3 rounded shadow bg-white"
            >
              <p>
                <strong>Câu {i + 1}:</strong> {q.noidung}
              </p>
              {q.dapan.map((d) => (
                <label key={d.macautl} className="block">
                  <input
                    type="radio"
                    name={`q${q.macauhoi}`}
                    disabled={submitted}
                    checked={answers[q.macauhoi] === d.macautl}
                    onChange={() => handleAnswer(q.macauhoi, d.macautl)}
                  />{" "}
                  {d.noidungtl}
                </label>
              ))}
            </div>
          ))}
          {!submitted && (
            <button
              onClick={submitPractice}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Nộp bài
            </button>
          )}
        </div>
      )}
    </div>
  );
}
