 const mongoose = require("mongoose");

 const subCategoriesSchema = mongoose.Schema({
   name: {
     type: String,
     required: true,
   },
   title: {
     type: String,
     required: true,
   },
   description: {
     type: String,
     required: true,
   },
   category: {
     type: mongoose.Schema.ObjectId,
     ref: "Category",
   },
   createdAt: {
     type: Date,
     default: Date.now(),
   },
 });

 subCategoriesSchema.pre(/^find/, function (next) {
   this.populate({ path: "category", select: "-__v" });
   next();
 });

 const SubCategories = mongoose.model("SubCategories", subCategoriesSchema);
 module.exports = SubCategories;