const coupon = require('../../model/addcouponModel');

exports.getCoupons = async(req,res)=>{
     try{
        const coupons = await coupon.find();
        if(!coupon){
            return res.status(200).json({
                error:true,
                message:'Something went wrong'
            });
        }
        
        return res.status(200).json({
            error:false,
            data:coupons,
            message:'Coupons fetched successfully'
        });

     }catch (e){
        return res.status(500).json({
            error:true,
            message:e
        });
     }
}