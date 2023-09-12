const Category = require("./../models/categoryModel");
const factory = require('./handlerFactory');

exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create({...req.body, courses: req.course.id});
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

exports.getAllCategories = factory.getAll(Category);
exports.getCategory = factory.getOne(Category);
// exports.createCategory = factory.createOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
