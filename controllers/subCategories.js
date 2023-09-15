const SubCategory = require("./../models/subCategoriesModel");
const factory = require("./handlerFactory");

exports.createsubCategories = async (req, res) => {
  try {
    const newSubCategory = await SubCategory.create(req.body);
    res.status(200).json({
      status: "Success",
      data: { newSubCategory },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.getAllsubCategories = factory.getAll(SubCategory);
exports.getsubCategories = factory.getOne(SubCategory);
// exports.createCategory = factory.createOne(SubCategory);
exports.updatesubCategories = factory.updateOne(SubCategory);
exports.deletesubCategories = factory.deleteOne(SubCategory);
