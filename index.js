const express = require('express');
const app = express();
const userRouter = require('./routes/userRoutes');
const mongoose = require('mongoose');


//MIDDLEWARE to modify incoming request data :
app.use(express.json());





//ROUTES:
app.use("/api/v1/users", userRouter);

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