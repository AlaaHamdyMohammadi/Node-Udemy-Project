const express = require('express');
const cors = require("cors");
const app = express();
const userRouter = require('./routes/userRoutes');
const courseRouter = require('./routes/courseRoutes');
const reviewRouter = require("./routes/reviewRoutes");
const categoryRouter = require('./routes/categoryRoutes');
const subCategoryRouter = require("./routes/subCategoriesRoutes");
const cartRouter = require('./routes/cartRoutes');
const wishListRouter = require('./routes/wishListRoutes');
const enrolledRouter = require('./routes/enrolledRoutes');
const buyingRouter = require("./routes/buyingRoutes");
const mongoose = require('mongoose');
 
//MIDDLEWARE to modify incoming request data :
app.use(express.json());
app.use(cors());

//ROUTES:
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subCategories", subCategoryRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/wishLists", wishListRouter);
app.use("/api/v1/enrolled", enrolledRouter);
app.use("/api/v1/buyings", buyingRouter);


//Error Handleing
app.use('*', function(req, res,next){
    res.status(404).json({
        status: 'Faild',
        message: 'Not Found',
    })
    next();
});

// app.use(function(err, req, res, next){
//     res.status(500).json({
//         status: 'Faild',
//         message: 'Error 1',
//     })
// })

mongoose
  .connect(
    "mongodb+srv://GraduationProject:iti-team2@cluster0.daxyxcz.mongodb.net/projectNode?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database Connected Successfuly");
  })
  .catch((err) => {
    console.log(err);
  });


//START SERVER: 
const port = 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})