const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const sendEmail = require("./../utils/email");
require("dotenv").config();

const tokenFunction = (id) => {
  jwt.sign({ id }, "This-Is-Node-Project-JWT-Secret.", {
    expiresIn: "90d",
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    const token = tokenFunction(newUser._id);

    res.status(200).json({
      status: "Success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Faild",
      message: err,
    });
  }
};

//Sign a JWT and senc back to the client
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //1- Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: "Faild",
        message: "Please provide email and password",
      });
    }

    //2- Check if user exist and password is correct
    //+password: To show again to the output and check it
    const user = await User.findOne({ email }).select("+password");

    const correct = await user.correctPassword(password, user.password);

    if (!user || !correct) {
      return res.status(401).json({
        status: "Faild",
        message: "Invalid email or password",
      });
    }

    //3- Send token to the client
    //const token = tokenFunction(user._id); (This calling function not working in login! and I don't have any reason for that.)

    const token = jwt.sign(
      { id: user._id },
      "This-Is-Node-Project-JWT-Secret.",
      {
        expiresIn: "90d",
      }
    );

    res.status(200).json({
      status: "Success",
      token,
      data: { user },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1- Get token and check of it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) { 
      token = req.headers.authorization.split(" ")[1];
    }
    //console.log(token)
    if (!token) {
      //return next('You are not logged in! Please log in to get access');
      return res.status(401).json({
        status: "Faild",
        message: "You are not logged in! Please log in to get access",
      });
    }
    // 2- Verification token
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_KEY
    );
    

    // 3- Check if user still exists
    const newUser = await User.findById(decoded.id);
    if (!newUser) {
      //return next();
      return res.status(401).json({
        status: "Faild",
        message: "The user to this token is not exist",
      });
    }

    // 4- Check if user changed password after the jwt was issued
    if (newUser.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        status: "Faild",
        message: "User changed the password! Please login again",
      });
    }
 
    //Grant access to protected route
    req.user = newUser;
    // console.log(newUser);
    req.id = decoded.id;
    next();
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

//Restrict certain routes(ex: deleting course) only to user roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "Faild",
        message: "You do not have a permission",
      });
    }
    next();
  };
}; 

//Reset Password Steps
//1- User send post request to forget password route(this create reset token and send to email)
exports.forgetPassword = async (req, res, next) => {
  //try{
  // 1- Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      status: "Faild",
      message: "There is no user with email address",
    }); 
  }
  // 2- Generate reset token
  const resetToken = user.createPasswordToken();

  await user.save({ validateBeforeSave: false });
  
  // 3- Send it to user's email
  const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;
  console.log(resetURL);
  const message = `Forget your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });
    
    res.status(200).json({
      status: "Success",
      message: "Token send to email",
    }); 
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    //return next('There was an error sending the email. Try again later!');
    return res.status(500).json({
      status: "Faild err",
      message: "There was an error sending the email. Try again later!",
    });
  }
  
  // }catch(err){
  //   res.status(404).json({
  //     status: "Faild err",
  //     message: err,
  //   });
  // }
};

//2- User send this token from email with a new password to update it
// exports.resetPassword = async(req, res, next) => {

//   try{
//     // 1- Get user based on the token(Encrypt token again and compare it with encrypted one in db)

//     const hashedToken = crypto
//       .createHash("sha256")
//       .update(req.params.token) // :token in resetPassword Route
//       .digest("hex");

//     const user = await User.findOne({
//       passwordResetToken: hashedToken,
//       passwordResetExpires: { $gt: Date.now() },
//     });

//     // 2- Set password if token has not expired
//     if (!user) {
//       res.status(400).json({
//         status: "Faild",
//         message: "Token is invalid or expired!",
//       });
//     }

//     user.password = req.body.password;
//     user.passwordConfirm = req.body.passwordConfirm;
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save();

//     // 3- Update changedPasswordAt property for the user

//     // 4- Log the user in, send JWT
//     const token = jwt.sign(
//       { id: user._id },
//       "This-Is-Node-Project-JWT-Secret.",
//       {
//         expiresIn: "90d",
//       }
//     );

//     res.status(200).json({
//       status: "Success",
//       data: { token },
//     });
//   }catch(err){
//     res.status(404).json({
//       status: "Faild",
//       message: err,
//     });
//   }
// };
