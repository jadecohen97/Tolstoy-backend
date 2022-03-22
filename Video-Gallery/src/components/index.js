import React from "react";
import { useEffect, useState } from "react";
import Header from "./header";
import Gallery from "./gallery";
import styled from "styled-components";
import Modal from "react-modal";
import "../styled/index.css";

const Index = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [refresh, setIsRefresh] = useState(false);
  const onCloseModal = () => setModalIsOpen(false);
  const uploadVideo = () => {
    setModalIsOpen(true);
  };

  return (
    <div>
      <h1 style={{ padding: "2rem", margin: 0 }}>YOUR VIDEO GALLERY</h1>
      <button className="createVid" onClick={uploadVideo}>
        Create Your Video
      </button>
      <br />
      <button className="createVid" onClick={() => window.location.reload()}>
        Click to reload!
      </button>
      <Modal ariaHideApp={false} isOpen={modalIsOpen} className="modal">
        <button onClick={onCloseModal}>x</button>
        <Header modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      </Modal>
      <Gallery />
    </div>
  );
};
export default Index;
