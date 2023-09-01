const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Username is required!"] },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, "Please write a valid email"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["user", "instructor", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: 5,
    select: false, //To hidden password on the output
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password!"],
    validate: {
      //Work on create user and save
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //enrolledCourses: { type: mongoose.SchemaTypes.ObjectId, ref: "Course" },
});

userSchema.pre("save", async function (next) {
  //Encrypt password if password field is updated
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);

  //After check delete passwordConfirm from db
  this.passwordConfirm = undefined;
  next();
});


//This function will be run before a new document is actually saved
/*
userSchema.pre('save', function(next){
  //If password not changed or not create new document
  if (!this.isModified("password") || this.isNew) return next();

  // -1000: To put passwordChangedAt one second in the past to ensure the token is always created after the password has been changed
  this.passwordChangedAt = Date.now() - 1000;
  next();
})
*/

//To check if the given password is the same as the one stored in the document
    //Instance methods is available on all documents of the collection
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
  
  //Compare method: return true or false
  return await bcrypt.compare(candidatePassword, userPassword);
}   

userSchema.methods.changedPasswordAfter = function(jwtTimestamp){
  
  if (this.passwordChangedAt){
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    console.log(this.passwordChangedAt, jwtTimestamp);
    return jwtTimestamp < changedTimestamp;
  }
    //By default the user not changed his password
    return false;
};

//save data in encrypted form and compare it with encrypted version in db
userSchema.methods.createPasswordToken = function () {
  //Generate reset token(not encrypted)
  const resetToken = crypto.randomBytes(32).toString("hex");

  //Encryption in db
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({resetToken} , this.passwordResetToken);

  //Expires after 10 min : min(10) * sec(60) * millisec(1000)
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};



const User = mongoose.model("User", userSchema);

module.exports = User;
