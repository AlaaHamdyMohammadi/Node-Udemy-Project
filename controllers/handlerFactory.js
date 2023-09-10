exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      return next("No document found with that ID");
    }
    res.status(204).json({
      status: "Success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      massage: err,
    });
  }
};

exports.createOne = (Model) => async (req, res, next) => {
  try {
    const document = await Model.create(req.body);
    if (!document) {
      return next("No document found with that ID");
    }
    res.status(201).json({
      status: "Success",
      data: { document },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

exports.updateOne = (Model) => async (req, res, next) => {
  try {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      return next("No document found with that ID");
    }
    res.status(201).json({
      status: "Success",
      data: { document },
    });
  } catch (err) {
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};
