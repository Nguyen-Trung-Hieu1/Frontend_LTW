import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
// SỬA: Import axios thay vì fetchModel để hỗ trợ credentials tốt hơn
import axios from "axios"; 

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // SỬA: Dùng axios.get với withCredentials: true để gửi Cookie Session
    axios.get("http://localhost:8081/api/user/list", { 
        withCredentials: true 
    })
      .then((response) => {
        // Axios lưu dữ liệu trả về trong thuộc tính .data
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {/* GIỮ NGUYÊN các thẻ và logic map của bạn */}
      {users.map((user) => (
        <Link key={user._id} to={`/users/${user._id}`}>
          {user.first_name} {user.last_name}
          <br />
        </Link>
      ))}
    </div>
  );
}

export default UserList;