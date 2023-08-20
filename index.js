const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const courseRouter = require('./routes/courseRoutes');
const mongoose = require('mongoose');


//MIDDLEWARE to modify incoming request data :
app.use(express.json());


//ROUTES:
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);


//Error Handleing
app.use('*', function(req, res,next){
    res.status(404).json({
        status: 'Faild',
        message: 'Not Found',
    })
    next();
});

app.use(function(err, req, res, next){
    res.status(500).json({
        status: 'Faild',
        message: 'Error',
    })
})

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