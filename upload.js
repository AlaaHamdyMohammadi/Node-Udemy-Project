const cloudinary = require("cloudinary").v2;
// const CLOUDINARY_API = `https://api.cloudinary.com/v1_1/dojogaspp/mh/upload`;
// const CLOUDINARY_UPLOAD_PRESET = `tbd8ilie/mh/upload`; 

const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "./public/videos" }); // Configure the destination folder for uploaded files
const app = express();

cloudinary.config({
  cloud_name: "dfblc4yij",
  api_key: "544755784575998",
  api_secret: "AdIWJbMLLzhVWzj4RzxW8VQlTlQ",
});




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