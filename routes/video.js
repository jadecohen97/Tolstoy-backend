const { Router } = require("express");
const express = require("express");
const { uploadToCloudinary } = require("../lib/cloudinary");
const { query } = require("../lib/database");
const SQL = require("@nearform/sql");
const router = express.Router();
const { upload } = require("../middleware/multipart");
const { v4: uuid } = require("uuid");
const fs = require("fs");

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  const id = uuid();
  const video = "empty";
  const sql = SQL`INSERT INTO videos (
    id,
    name,
    description,
    video
  ) VALUES (${id}, ${name}, ${description}, ${video})`;
  await query(sql);
  console.log(sql);
  res.send(id);
});

router.put("/video/:id", upload.single("video"), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.path);
    const id = req.params.id;
    const video_url = result.secure_url;
    const sql = SQL`UPDATE videos SET video = ${video_url} WHERE id =${id}`;
    await query(sql);
    console.log(video_url);
    res.send(video_url);
  } catch (err) {
    res.send("there was an error loading your video");
  }
});

router.get("/", async (req, res) => {
  const allVideos = await query(SQL`SELECT * FROM videos`);
  res.send(allVideos);
});

module.exports = router;
