
const {Address} = require('../../model/createOrderModel');

exports.getAddress = async(req,res)=>{
    const userId = req.query.userId;

    try{
       if(!userId){
          return res.status(400).json({
            error:true,
            message:"UserId is required"
          });
       }
       const data = await Address.find({userId:userId}).exec();
       if(!data){
        return res.status(404).json({
            error:true,
            message:"Something went wrong"
          });
       }else{
        return res.status(200).json({
            error:false,
            data:data,
            message:"Address fetched successfully"
          });
       }
    }catch (e){
        return res.status(500).json({
            error:true,
            message:e
          });
    }
}