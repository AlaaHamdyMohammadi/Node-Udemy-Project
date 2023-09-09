const Category = require("./../models/categoryModel");
const factory = require('./handlerFactory');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      status: "Success",
      results: categories.length,
      data: { categories },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: { category },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
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
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    req.status(200).json({
        status: 'Success',
        data: {category}
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

// exports.deleteCategory = async(req, res) => {
//     try{
//         const category = await Category.findByIdAndDelete(req.params.id);
//         res.status(200).json({
//             status: 'Success',
//             data: null,
//         });
//     }catch(err){
//         res.status(404).json({
//           status: "Faild",
//           message: err,
//         });
//     }
// };

exports.deleteCategory = factory.deleteOne(Category);