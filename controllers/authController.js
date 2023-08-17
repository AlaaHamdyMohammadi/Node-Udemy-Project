const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = jwt.sign({id: newUser._id}, 'This-Is-Node-Project-JWT-Secret.', {expiresIn: '90d'})
    
    res.status(200).json({
      status: "Success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};
