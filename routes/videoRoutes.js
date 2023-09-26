const express = require('express');
const multer = require("multer");
const path = require("path");
const videoController = require('./../controllers/videoController');

const videoRouter = express.Router();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/videos");
  },
  filename: (req, file, cb) => {
    cb(null, `video-${Date.now()}-${file.originalname}`);
  },
});

const multerFilter = (req, file, cb) => {
  const extention = path.extname(file.originalname);
  if (extention !== ".mkv" && extention !== ".mp4") {
    cb("Not video! Please upload only videos.", false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});


videoRouter.route('/').get(videoController.getAllVideos).post(upload.fields([
    {
        name: 'videos',
        maxCount: 5,
    }
]),videoController.createVideo);

videoRouter.route("/:id").delete(videoController.deleteVideo);


module.exports = videoRouter;