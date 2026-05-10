import './App.css';
import React, { useState } from "react"; // THÊM: useState
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // THÊM: Navigate để điều hướng

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister"; // THÊM: Component đăng nhập

const App = (props) => {
  // THÊM: State quản lý trạng thái đăng nhập và thông tin user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogout = () => {
  setIsLoggedIn(false);
  setUser(null);
  // Có thể dùng window.location.href = "#/login-register" để chắc chắn quay về trang login
};
  // THÊM: Hàm xử lý khi login thành công
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* SỬA: Truyền thông tin login vào TopBar */}
            <TopBar isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
          </Grid>
          <div className="main-topbar-buffer" />
          
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {/* SỬA: Chỉ hiển thị UserList khi đã đăng nhập */}
              {isLoggedIn ? <UserList /> : null}
            </Paper>
          </Grid>

          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                {/* THÊM: Route cho Login/Register */}
                <Route 
                  path="/login-register" 
                  element={
                    isLoggedIn ? 
                    <Navigate to={`/users/${user._id}`} /> : 
                    <LoginRegister onLoginSuccess={handleLoginSuccess} />
                  } 
                />

                {/* SỬA: Bảo vệ các Route, nếu chưa login thì đá về /login-register */}
                <Route
                  path="/users/:userId"
                  element={isLoggedIn ? <UserDetail /> : <Navigate to="/login-register" />}
                />
                <Route
                  path="/photos/:userId"
                  element={isLoggedIn ? <UserPhotos /> : <Navigate to="/login-register" />}
                />

                {/* THÊM: Trang chủ mặc định */}
                <Route 
                  path="/" 
                  element={
                    isLoggedIn ? 
                    <Navigate to={`/users/${user._id}`} /> : 
                    <Navigate to="/login-register" />
                  } 
                />

                {/* Giữ nguyên các thẻ khác nếu cần hoặc xóa nếu đã có Navigate bảo vệ */}
                <Route path="/users" element={isLoggedIn ? <UserList /> : <Navigate to="/login-register" />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}

export default App;