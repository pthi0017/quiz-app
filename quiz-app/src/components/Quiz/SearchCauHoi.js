import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchCauHoi = () => {
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [subject, setSubject] = useState('');

  const search = () => {
    axios.get(`http://localhost/WEBQUIZZ/Chucnang/search_cauhoi.php?keyword=${keyword}&mamonhoc=${subject}`)
      .then(res => setList(res.data));
  };

  return (
    <div>
      <input placeholder="Từ khóa" value={keyword} onChange={e => setKeyword(e.target.value)} />
      <select onChange={e => setSubject(e.target.value)}>
        <option value="">Chọn môn học</option>
        <option value="1">Toán</option>
        <option value="2">Lý</option>
        {/* ... */}
      </select>
      <button onClick={search}>Tìm kiếm</button>
      <ul>
        {list.map(q => <li key={q.macauhoi}>{q.noidung}</li>)}
      </ul>
    </div>
  );
};

export default SearchCauHoi;

