const WishList = require("./../models/wishListModel");
const factory = require("./handlerFactory");

exports.createWishList = async (req, res, next) => {
  const wishList = await WishList.create({ ...req.body, user: req.id });
  res.status(200).json({
    status: "Success",
    data: { wishList },
  });
};

exports.getAllWishLists = factory.getAll(WishList);
exports.getWishList = factory.getOne(WishList);
// exports.createWishList = factory.createOne(WishList);
exports.updateWishList = factory.updateOne(WishList);
exports.deleteWishList = factory.deleteOne(WishList);
