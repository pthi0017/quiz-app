import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost/WEBQUIZZ/Chucnang/list_users.php');
      setUsers(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Danh sách người dùng</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListUsers;
