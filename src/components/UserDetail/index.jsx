import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import "./styles.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import axios from "axios"; 
function UserDetail() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    
    axios.get(`http://localhost:8081/api/user/${userId}`, { 
        withCredentials: true 
    })
    
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div key={user._id}>
        <div>ID :{user._id}</div>
        <div>Location :{user.location}</div>
        <div>Description :{user.description}</div>
        <div>Occupation :{user.occupation}</div>

        <Link to={`/photos/${user._id}`}>
          <button>Photos</button>
        </Link>

        <Link to="/users">
          <button>Back </button>
        </Link>
      </div>
    </div>
  );
}

export default UserDetail;