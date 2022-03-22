import React from "react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getAllVideos } from "../lib/api";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "nuka-carousel";
import "../styled/gallery.css";

const Gallery = () => {
  const [allVideos, setAllVideos] = useState([]);
  useEffect(() => {
    getAllVideos().then((data) => {
      setAllVideos(data);
    });
  }, []);

  return (
    <div className="gallery">
      <div className=" centerVideo">
        <ReactPlayer
          className="reactPlayer"
          style={{ border: "2px solid black" }}
          playing={true}
          controls
          url="https://res.cloudinary.com/dxfdoreiy/video/upload/v1619614549/samples/elephants.mp4"
        />
      </div>
      <div className="carousel-gallery">
        <Carousel
          slidesToShow={4}
          setIsUrl={true}
          defaultControlsConfig={{
            pagingDotsStyle: {
              top: "-20px",
              marginTop: "800px",
              fill: "blue",
            },
          }}
          className="carousel"
        >
          {allVideos.map((allVideos) => (
            <li key={allVideos.id}>
              <div className="allVideos">
                <div className="videoName">{allVideos.name}</div>
                <div className="videoDescription">{allVideos.description}</div>
                <ReactPlayer
                  width="100%"
                  padding="20px"
                  controls
                  url={allVideos.video}
                  className="reactPlayer"
                />
              </div>
            </li>
          ))}
        </Carousel>
      </div>
    </div>
  );
};
export default Gallery;
