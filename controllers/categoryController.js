const Category = require("./../models/categoryModel");
const factory = require('./handlerFactory');
const multer = require("multer");

const multerStorage = multer.diskStorage({
  // destination is a callback function
  destination: (req, file, cb) => {
    //null => Means not have an error
    cb(null, "public/img/categories");
  },
  filename: (req, file, cb) => {
    const extention = file.mimetype.split("/")[1];
    console.log(file.mimetype);
    cb(null, `category-${req.id}-${Date.now()}.${extention}`);
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

exports.uploadCategoryPhoto = upload.single("photo");

exports.createCategory = async (req, res) => {
  try {
    const photo = req.file.filename;
    const newCategory = await Category.create({ ...req.body, photo });
    res.status(200).json({
      status: "Success",
      data: { newCategory },
    }); 
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.file) {
      const photo = req.file.filename;
      console.log(req.file);
      const category = await Category.findByIdAndUpdate(
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
          category,
        },
      });
    }

    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "Success",
      data: {
        category,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.getAllCategories = factory.getAll(Category);
exports.getCategory = factory.getOne(Category);
// exports.createCategory = factory.createOne(Category);
//exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
