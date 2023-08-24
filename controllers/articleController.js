const Article = require("../models/articleModel");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  // destination is a callback function
  destination: (req, file, cb) => {
    //null => Means not have an error
    cb(null, "public/img/articles");
  },
  filename: (req, file, cb) => {
    const extention = file.mimetype.split("/")[1];
    cb(null, `user-${req.params.id}-${Date.now()}.${extention}`);
  },
});

const multerFilter = (req, file, cb) => {
  //mimetype always contain image word to check
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Not an image! Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadArticlePhoto = upload.single("photo");

//create article
const createArticle = (req, res) => {
  const article = req.body;
  Article.create(article)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//get all articles
  //get all articles
const getAllArticles = (req, res) => {
    //pagination
    const page = req.query.p || 1;
    const numOfAtricles = 3;
    const limit = (page - 1) * numOfAtricles;
    //filteration
    const queryObj = {...req.query};
    delete queryObj.p;
    // console.log(queryObj);
    let articles = Article.find(queryObj)
    //pagination
    .skip((page - 1) * numOfAtricles)
    .limit(numOfAtricles)
    if(req.query.p){
        Article.countDocuments({}).then((result) => {
            if(limit >= result){
                return res.status(404).send({message: "page not found"})
            }else{
                getArticles(articles, res);
            }
        }).catch(err => {
            return res.status(401).send(err);
        })
    }else{
        getArticles(articles, res);
    }
}

function getArticles(articles, res) {
    articles.then((result) => {
        return res.send(result);
    })
    .catch(err => {
        return res.status(401).send(err);
    });
}

//get article by id
const getArticleById = (req, res) => {
  const { id } = req.params;
  Article.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//update article
const updateArticle = async(req, res) => {
  // const { id } = req.params;
  // const article = req.body;
  // Article.findByIdAndUpdate(id, article, { new: true })
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  try {
    const { id } = req.params;

    if (req.file) {
      const photo = req.file.path;
      console.log(req.file);
      const article = await Article.findByIdAndUpdate(
        id,
        { photo, ...req.body },
        {
          new: true,
          runValidators: true,
        }
      );
      return res.status(200).json({
        status: "Success",
        data: {
          article,
        },
      });
    }
    const article = await Article.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      data: {
        article,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

//delete article
const deleteArticle = (req, res) => {
  const { id } = req.params;
  Article.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
};
