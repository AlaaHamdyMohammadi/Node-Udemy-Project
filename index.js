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
const videoRouter = require('./routes/videoRoutes');
const buyingRouter = require("./routes/buyingRoutes");
const mongoose = require('mongoose');

const path = require("path");
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

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
app.use("/api/v1/videos", videoRouter);
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

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
 
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Connected Successfuly");
  })
  .catch((err) => {
    console.log(err);
  });


//START SERVER: 
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})