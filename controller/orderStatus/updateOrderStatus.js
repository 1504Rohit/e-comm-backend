const Status = require('../../model/orderStatusModel');

exports.OrderStatus = async(req,res)=>{

    try{
        if(!req.user.isAdmin){
            return res.status(400).json({
                error:true,
                message:'Unauthorized..'
            });
        }
        const {orderId,status,statusCode} = req.body;

        if( !orderId || !status || !statusCode){
           return res.status(500).json({
                error:true,
                message:"Some required fields are missing"
            });
        }

        const data = await Status.findOneAndUpdate(
            {  orderId: orderId },
            {
              
               status:status,
               statusCode:statusCode
            },
            {  new: true } 
        );

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
                message:"Status updated successfully"
            });
        }

    }catch (e){
       return res.status(500).json({
            error:true,
            message:e
        });
    }
}