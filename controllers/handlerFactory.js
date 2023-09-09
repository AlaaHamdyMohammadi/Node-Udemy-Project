exports.deleteOne = Model => async(req, res, next) => {
    try{
        const document = await Model.findByIdAndDelete(req.params.id);
        if(!document){
            return next("No document found with that ID");
        }
        res.status(204).json({
            status: 'Success',
            data: null,
        })
    }catch(err){
        res.status(404).json({
            status: 'Faild',
            massage: err,
        })
    };
};