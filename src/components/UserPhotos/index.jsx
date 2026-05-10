import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";
import axios from "axios"; 
function UserPhotos() {
  const { userId } = useParams();

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    

    axios.get(`http://localhost:8081/api/photo/photosOfUser/${userId}`, { 
        withCredentials: true 
    })

      .then((response) => {
        setPhotos(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <div>
      {photos.map((photo) => (
        <div
          key={photo._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          {/* Ảnh */}
          <img
            src={require(`../../images/${photo.file_name}`)}
            alt=""
            style={{ width: "300px" }}
          />

          {/* Thời gian ảnh */}
          <Typography>
            {new Date(photo.date_time).toLocaleString()}
          </Typography>

          {/* Comments */}
          <div>
            {photo.comments &&
              photo.comments.map((comment) => (
                <div
                  key={comment._id}
                  style={{
                    borderTop: "1px solid gray",
                    marginTop: "10px",
                    paddingTop: "10px",
                  }}
                >
                  {/* Thời gian comment */}
                  <Typography>
                    {new Date(comment.date_time).toLocaleString()}
                  </Typography>

                  {/* User comment */}
                  <Link to={`/users/${comment.user._id}`}>
                    {comment.user.first_name} {comment.user.last_name}
                  </Link>

                  {/* Nội dung comment */}
                  <Typography>
                    {comment.comment}
                  </Typography>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;