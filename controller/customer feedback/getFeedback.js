const Feedback = require('../../model/customerFeedbackModel');

exports.getFeedback = async(req,res)=>{
    const productId = req.query.productId;
   
    if(!productId){
        return res.status(400).json({
            error:true,
            message:"ProductId is required"
        });
    }

    const data = await Feedback.find({productId:productId}).exec();

    if(!data){
        return res.status(404).json({
            error:true,
            message:"Something went wrong"
        });
    }else{
        return res.status(200).json({
            error:false,
            data:data,
            message:"Feedback fetched successfully"
        });
    }
}