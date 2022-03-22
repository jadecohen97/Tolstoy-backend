import axios from "axios";
const BaseUrl = "http://localhost:8080";

export async function addVideoContent(addVideo) {
  const response = await axios.post(`${BaseUrl}`, {
    name: addVideo.name,
    description: addVideo.description,
    // video: addVideo.video,
    // date: addVideo.date,
  });
  return response.data;
}

export async function putVideo(id, formData) {
  const response = await axios({
    method: "put",
    url: `${BaseUrl}/video/${id}`,
    data: formData,
    headers: {
      // Authorization: `Bearer ` + token,
      "Content-Type": "multipart/form-data",
    },
  });
//   console.log(response.data, "response.data");
//   console.log(response, "response from api");
  return response.data;
}

export async function getAllVideos() {
  const response = await axios.get(`${BaseUrl}`);
  return response.data;
}
