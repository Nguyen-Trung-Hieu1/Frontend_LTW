import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function TopBar() {
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
          const user = response.data;

          if (path.startsWith("/users/")) {
            setContext(` ${user.last_name}`);
          }

          if (path.startsWith("/photos/")) {
            setContext(`Photos of ${user.last_name}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setContext("");
    }
  }, [location]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" color="inherit">
          Nguyễn Trung Hiếu
        </Typography>

        <Typography variant="h6" color="inherit">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;