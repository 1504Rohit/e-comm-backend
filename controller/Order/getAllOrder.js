const {Order} = require('../../model/createOrderModel');

exports.getAllOrder = async(req,res)=>{
    const userId = req.query.userId;
    try{
       if(!userId){
        return res.status(404).json({
            error:true,
            message:'UserId is required'
        });
       }
       const data = await Order.find({ userId: userId }).exec();
       if(!data){
        return res.status(404).json({
            error:true,
            message:'Something went wrong'
        });
       }else{
        return res.status(200).json({
            error:false,
            data:data,
            message:'Order fetched successfully'
        });
       }
    }catch (e){
        return res.status(500).json({
            error:true,
            message:e
        });
    }
}