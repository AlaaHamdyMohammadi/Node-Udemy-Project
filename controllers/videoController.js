const Video = require('./../models/videoModel');
// const multer = require('multer');
// const path = require('path');

// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, 'public/videos');
//     },
//     filename: (req, file, cb) =>{
//         cb(null, `video-${Date.now()}-${file.originalname}`)
//     }
// });

// const multerFilter = (req, file, cb) => {
//     const extention = path.extname(file.originalname);
//     if(extention !== '.mkv' && extention !== '.mp4'){
//         cb("Not video! Please upload only videos.", false);
//     }else{
//         cb(null, true);
//     }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

exports.getAllVideos = async(req, res) => {
    try{
        const videos = await Video.find();
        res.status(200).json({
            results: videos.length,
            status: 'Success',
            data: videos,
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            status: 'Faild',
            message: err,
        })
    }
};

exports.createVideo = async(req, res) => {
    const {name} = req.body;
    let videosPaths = [];
    if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
        for(let video of req.files.videos){
            videosPaths.push("/" + video.path.replaceAll(/\\/g, `/`));
            console.log(video.path.replaceAll(/\\/g, `/`))
        }
    }
    try{
        const video = await Video.create({ name, videos: videosPaths });
        res.status(200).json({
          status: "Success",
          data: video,
        });
    }catch(err){
        console.log(err);
        res.status(400).json({
          status: "Faild",
          message: err,
        });
    }
};

exports.deleteVideo = async(req, res) => {
    try{
        const video = await Video.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'Success',
            data: null,
        });
    }catch(err){
        res.status(404).json({
          status: "Faild",
          message: err,
        });
    }
}