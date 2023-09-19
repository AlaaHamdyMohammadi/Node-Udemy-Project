const SubCategory = require("./../models/subCategoriesModel");
const factory = require("./handlerFactory");

exports.createsubCategories = async (req, res) => {
  try {
    const {name, title, description, category} = req.body;
    // const newSubCategory = await SubCategory.create(req.body);
    const newSubCategory = await SubCategory.create({
      name,
      title,
      description,
      category,
    });
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

//Get /api/v1/categories/:categoryId/subcategories
exports.getAllsubCategories = async (req, res) => {
  try {
    //{category: req.body.categoryId}
    console.log(req.params.categoryId);
    let filterObj = {};
    if(req.params.categoryId) filterObj = { category: req.params.categoryId };
    const subCategories = await SubCategory.find(filterObj);
    res.status(200).json({ 
      status: "Success",
      results: subCategories.length,
      data: { subCategories },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

// exports.getSubCategoriesGroupedByCategory = async (req, res, next) => {
//   try {
//     const groupedSubcategories = await SubCategory.aggregate([
//       {
//         $group: {
//           _id: "$category",
//           subcategories: { $push: "$$ROOT" },
//         },
//       },
//       {
//         $lookup: {
//           from: "categories", // Assuming your category model is named "Category"
//           localField: "_id",
//           foreignField: "_id",
//           as: "category",
//         },
//       },
//       {
//         $unwind: "$category",
//       },
//     ]);

//     res.status(200).json({
//       status: "success",
//       data: groupedSubcategories,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

//exports.getAllsubCategories = factory.getAll(SubCategory);
exports.getsubCategories = factory.getOne(SubCategory);
// exports.createCategory = factory.createOne(SubCategory);
exports.updatesubCategories = factory.updateOne(SubCategory);
exports.deletesubCategories = factory.deleteOne(SubCategory);
