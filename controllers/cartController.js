const Cart = require("./../models/cartModel");
const factory = require("./handlerFactory");

exports.createCart = async (req, res, next) => {
  const cart = await Cart.create({...req.body, user: req.id});
  res.status(200).json({
    status: "Success",
    data: { cart },
  });
};

exports.getAllCarts = factory.getAll(Cart);
exports.getCart = factory.getOne(Cart);
// exports.createCart = factory.createOne(Cart);
exports.updateCart = factory.updateOne(Cart);
exports.deleteCart = factory.deleteOne(Cart);
