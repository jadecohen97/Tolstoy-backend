import React from "react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { putVideo, addVideoContent } from "../lib/api";
import Gallery from "./gallery";
import "../styled/header.css";
import ReactPlayer from "react-player";

const Header = ({ setModalIsOpen, modalIsOpen }) => {
  const [addVideo, setAddVideo] = useState({
    id: "",
    name: "",
    description: "",
    video: "",
  });
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleChange = (event) => {
    const value = event.target.value;
    setAddVideo({
      ...addVideo,
      [event.target.name]: value,
    });
  };

  const uploadVideo = async (event) => {
    event.preventDefault();
    const videoContent = await addVideoContent(addVideo);
    setModalIsOpen(false);
    const id = videoContent;
    const formData = new FormData();
    formData.append("video", videoUrl);
    try {
      const video = await putVideo(id, formData);
      addVideo.video = video;
      addVideo.id = id;
    } catch (err) {
      console.log(err);
    }
    setAddVideo({
      id: "",
      name: "",
      description: "",
      video: "",
    });
  };

  return (
    <div className="headerForm">
      <form onSubmit={uploadVideo}>
        <input
          type="file"
          accept=".mov,.mp4"
          name="video"
          onChange={(event) => setVideoUrl(event.target.files[0])}
          required
        />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={addVideo.name}
          placeholder="name your video"
          required
        />
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={addVideo.description}
          placeholder="description"
          required
        />

        <button className="uploadVideoBtn" disabled={!videoUrl}>
          UPLOAD VIDEO
        </button>
      </form>
    </div>
  );
};
export default Header;
