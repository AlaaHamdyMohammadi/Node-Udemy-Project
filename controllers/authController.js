const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");


const tokenFunction = (id) => {
  jwt.sign({ id }, "This-Is-Node-Project-JWT-Secret.", {
    expiresIn: "90d",
  });
}

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = tokenFunction(newUser._id);
    
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

//Sign a JWT and senc back to the client
exports.login = async(req, res, next) => {
  try{

  const {email, password} = req.body;

  //1- Check if email and password exist
  if(!email || !password){
    return res.status(400).json({
      status: "Faild",
      message: "Please provide email and password",
    });
  }

  //2- Check if user exist and password is correct
    //+password: To show again to the output and check it
  const user = await User.findOne({email}).select('+password');

  const correct = await user.correctPassword(password, user.password);

  if (!user || !correct) {
    return res.status(401).json({
      status: "Faild",
      message: "Invalid email or password",
    });
  }

  //3- Send token to the client
  // const token = tokenFunction(user._id);

  const token = jwt.sign({id: user._id }, "This-Is-Node-Project-JWT-Secret.", {
    expiresIn: "90d",
  });

  res.status(200).json({
    status: "Success",
    data: {token},
  });

  }catch(err){
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
  
};

exports.protect = async(req, res, next) => {
  try{
    // 1- Get token and check of it's there
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1];
    }
    // console.log(token)
    if(!token){
      //return next('You are not logged in! Please log in to get access');
      return res.status(401).json({
        status: "Faild",
        message: "You are not logged in! Please log in to get access",
      });
    }
    // 2- Verification token

    // 3- Check if user still exists

    // 4- Check if user changed password after the jwt was issued


  }catch(err){

  }

  next();
}
