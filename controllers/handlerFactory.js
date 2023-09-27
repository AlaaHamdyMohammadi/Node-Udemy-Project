//Factory function that can return handlers functions

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

exports.getOne = (Model) => async (req, res, next) => {
    try{
        const document = await Model.findById(req.params.id);
        if(!document){
            return next("No document found with that ID");
        }
        res.status(201).json({
          status: "Success",
          data: { document },
        });
    }catch(err){
        res.status(404).json({
          status: "Faild",
          message: err,
        });
    }
};

exports.getAll = (Model) => async (req, res, next) => {
    try {
      //Build Query
      //1-Filtering
      const queryObj = { ...req.query }; //Shallow Copy
      const excludedFields = ["page", "sort", "limit", "fields"];
      excludedFields.forEach((e) => delete queryObj[e]);

      // console.log(req.query, queryObj );
      //2-Filtering Mongo (convert obj to str to make functions on it)
        //{rating: {gte: "3"}} => {rating: {$gte: 3}} (gte, gt, lte, lt)
 
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

      console.log(JSON.parse(queryStr));
      console.log(req.query, queryObj);

      // const query = Model.find(queryObj);
      let query = Model.find(JSON.parse(queryStr)); //Return query so I can chain other methods

      // 2- Sorting
      if(req.query.sort){
        query = query.sort(req.query.sort);
      }else{
        query = query.sort('-createdAt');
      }

      // 3- Pagination

      //page=2&limit=10, 1-10(page1), 11-20(page2), 21-30(page3)
      
      //*1 => convert str to num, || 1 => page number1
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 20;
      const skip = (page - 1) * limit;
      
      query = query.skip(skip).limit(limit);

      if(req.query.page){
        const numbers = await Model.countDocuments();
        if(skip >= numbers){
          throw new Error('This Page Is Not Exist!')
        }
      }

      const documents = await query;
      if (!documents) {
        return next("No document found with that ID");
      }
      res.status(201).json({
        status: "Success",
        results: documents.length,
        data: {documents} ,
      });
    } catch (err) {
      res.status(404).json({
        status: "Faild",
        message: 'This Page Is Not Exist!',
      });
    }
};