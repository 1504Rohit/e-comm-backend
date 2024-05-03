
const Status = require('../../model/orderStatusModel');

exports.getStatus = async (req,res)=>{
    try{
        if(req.user.isAdmin){
            return res.status(400).json({
                error:true,
                message:'Unauthorized..'
            });
           }
        const {userId,orderId} = req.body;
        if(!userId || !orderId ){
            return res.status(500).json({
                 error:true,
                 message:"Some required fields are missing"
             });
         }
        
         const data = await Status.find({userId:userId,orderId:orderId}).exec();

         if(!data){
            return res.status(400).json({
                error:true,
                message:"Something went wrong"
            });
        }else{
            return res.status(200).json({
                error:false,
                data:data,
                message:"Status fetched successfully"
            });
        }

    }catch (e){
        return res.status(500).json({
            error:true,
            message:e
        });
    }
}