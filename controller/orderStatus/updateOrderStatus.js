const Status = require('../../model/orderStatusModel');

exports.OrderStatus = async(req,res)=>{
    try{
        const statusId = req.query.statusId;
        if(!statusId){
            return res.status(500).json({
                 error:true,
                 message:"StatusId is required"
             });
         }
        const {userId,orderId,status,statusCode} = req.body;

        if(!userId || !orderId || !status || !statusCode){
           return res.status(500).json({
                error:true,
                message:"Some required fields are missing"
            });
        }

        const data = await Status.findByIdAndUpdate(
            {  _id: statusId },
            {
            userId:userId,
            orderId:orderId,
            status:status,
            statusCode:statusCode
        }, { new: true } );

        if(!data){
            return res.status(400).json({
                error:true,
                message:"Something went wrong"
            });
        }else{
            return res.status(201).json({
                error:false,
                data:{
                    Status:data.status
                },
                message:"Status created successfully"
            });
        }

    }catch (e){
       return res.status(500).json({
            error:true,
            message:e
        });
    }
}