const User = require('./../models/userModel');

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "Success",
    data,
  });
};

exports.createUser = async(req, res) => {
    try{
      // console.log(req.body);
      const newUser = await User.create(req.body);
      res.status(201).json({
        status: "Success",
        data: newUser,
      });
    }catch(err){
        res.status(400).json({
            status: "Faild",
            message: err,
        });
    }
};

exports.getUser = (req, res) => {
  // const id = req.params.id * 1;
  //const user =

  // if(id > users.length){
  //   return res.status(404).json({
  //     status: 'Faild',
  //     message: 'Invalid ID',
  //   })
  // }

  res.status(200).json({
    status: "Success",
    data,
  });
  // console.log(req.body);
};

exports.updateUser = (req, res) => {
  //const id = req.params.id * 1;
  // if(id > users.length){
  //   return res.status(404).json({
  //     status: 'Faild',
  //     message: 'Invalid ID',
  //   })
  // }

  res.status(200).json({
    status: "Success",
    data,
  });
};

exports.deleteUser = (req, res) => {
  res.status(204).json({
    status: "Success",
    data: null,
  });
};
