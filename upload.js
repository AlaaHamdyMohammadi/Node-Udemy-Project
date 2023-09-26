// const cloudinary = require("cloudinary").v2;
// // const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/dojogaspp/mh/upload`;
// // const CLOUDINARY_UPLOAD_PRESET = `tbd8ilie/mh/upload`; 

// const express = require("express");
// const multer = require("multer");
// const upload = multer({ dest: "./public/videos" }); // Configure the destination folder for uploaded files
// const app = express();

// cloudinary.config({
//   cloud_name: "dfblc4yij",
//   api_key: "544755784575998",
//   api_secret: "AdIWJbMLLzhVWzj4RzxW8VQlTlQ",
// });

//const file =`./public/videos/awesome-video.mp4`;

// async function runVideo(){
//     try{
//         const result = await cloudinary.uploader.upload(file, {resourse_type: 'video'});
//         console.log(`Result: ${result.secure_url}`)
//     }catch(err){
//         console.log(err);
//     }
// }

// runVideo();

//tbd8ilie
//https://api.cloudinary.com/v1_1/dojogaspp

//------------------------------------------------------------------------------------------
// const express = require('express');
// const fs = require('fs');
// const app = express();

// const videoFileMap = {
//   video: "public/videos/awesome-video.mp4",
// };

// app.get('/public/videos/:filename', (req, res, next) => {
//   const fileName = req.params.filename;
//   const filePath = videoFileMap[fileName];
//   if(!filePath){
//     return res.status(404).send('File not found');
//   }
//   const stat = fs.statSync(filePath);
//   const fileSize = stat.size;
//   const range = req.headers.range;
//   if(range){
//     const parts = range.replace(/bytes=/, '').split('-');
//     const start = parseInt(parts[0], 10);
//     const end = parts[1] ?  parseInt(parts[1], 10) : fileSize - 1;

//     const chunksize = end - start + 1;
//     const file = fs.createReadStream(filePath, {start, end});
//     const head = {
//       'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//       'Accept-Ranges': 'bytes',
//       'Content-Length': chunksize,
//       'Content-Type': 'video/mp4',
//     };
//     res.writeHead(206, head);
//     file.pipe(res);
//   }else{
//     const head = {
//       "Content-Length": fileSize,
//       "Content-Type": "video/mp4",
//     };
//     res.writeHead(200, head);
//     fs.createReadStream(filePath).pipe(res);
//   }
// })