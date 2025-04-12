import { useEffect, useState } from "react";

export default function TakeExamPage({ macode, manguoidung }) {
  const [cauhois, setCauhois] = useState([]);
  const [traloi, setTraloi] = useState({});

  useEffect(() => {
    fetch(`http://localhost/WEBQUIZZ/Chucnang/lay_cauhoi_de_thi.php?macode=${macode}`)
      .then(res => res.json())
      .then(data => {
        setCauhois(data);
      });
  }, [macode]);

  const handleChoose = (macauhoi, madapan) => {
    setTraloi({ ...traloi, [macauhoi]: madapan });
  };

  const handleSubmit = () => {
    const traloi_arr = Object.entries(traloi).map(([macauhoi, madapan]) => ({
      macauhoi, madapan
    }));

    fetch("http://localhost/WEBQUIZ/Chucnang/cham_diem.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ manguoidung, macode, traloi: traloi_arr }),
    })
      .then(res => res.json())
      .then(data => {
        alert("Hoàn tất! Điểm số: " + data.diem);
      });
  };

  return (
    <div>
      <h2>Làm bài thi</h2>
      {cauhois.map((c, idx) => (
        <div key={c.macauhoi}>
          <p><strong>Câu {idx + 1}:</strong> {c.noidung}</p>
          {c.dapan.map(d => (
            <label key={d.madapan}>
              <input
                type="radio"
                name={`cauhoi_${c.macauhoi}`}
                value={d.madapan}
                checked={traloi[c.macauhoi] === d.madapan}
                onChange={() => handleChoose(c.macauhoi, d.madapan)}
              />
              {d.noidung}
            </label>
          ))}
          <hr />
        </div>
      ))}
      <button onClick={handleSubmit}>Nộp bài</button>
    </div>
  );
}
