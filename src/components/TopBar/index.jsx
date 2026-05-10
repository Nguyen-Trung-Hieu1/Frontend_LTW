import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

// NHẬN THÊM PROPS TỪ APP.JS
function TopBar({ isLoggedIn, user, onLogout }) {
  const location = useLocation();

  const [context, setContext] = useState("");

  useEffect(() => {
    const path = location.pathname;

    let userId = null;

    if (path.startsWith("/users/")) {
      userId = path.split("/")[2];
    }

    if (path.startsWith("/photos/")) {
      userId = path.split("/")[2];
    }

    if (userId) {
      fetchModel(`http://localhost:8081/api/user/${userId}`)
        .then((response) => {
          const userData = response.data;

          if (path.startsWith("/users/")) {
            setContext(` ${userData.last_name}`);
          }

          if (path.startsWith("/photos/")) {
            setContext(`Photos of ${userData.last_name}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setContext("");
    }
  }, [location]);

  // ===== LOGOUT FUNCTION (THÊM MỚI) =====
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8081/admin/logout",
        {},
        { withCredentials: true }
      );

      if (onLogout) {
        onLogout(); // reset state ở App.js
      }

      alert("Đã đăng xuất!");
    } catch (err) {
      console.log("Lỗi logout:", err);
      if (onLogout) onLogout();
    }
  };

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* BÊN TRÁI */}
        <Typography variant="h5" color="inherit">
          Nguyễn Trung Hiếu
        </Typography>

        {/* GIỮ NGUYÊN CONTEXT CŨ */}
        <Typography variant="h6" color="inherit">
          {context}
        </Typography>

        {/* ===== BÊN PHẢI: LOGIN / LOGOUT ===== */}
        {isLoggedIn ? (
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Typography variant="body1">
              Hi {user?.first_name}
            </Typography>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : null}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;