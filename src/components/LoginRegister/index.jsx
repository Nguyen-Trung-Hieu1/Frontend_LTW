import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";

function LoginRegister({ setUser }) {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    fetch("http://localhost:8081/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login_name: loginName,
        password: password,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Login failed");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data); // lưu user login
      })
      .catch(() => {
        setError("Sai login_name hoặc password");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5">Login</Typography>

      <TextField
        label="Login Name"
        onChange={(e) => setLoginName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>

      <Typography color="red">{error}</Typography>
    </div>
  );
}

export default LoginRegister;