
const coupon = require('../../model/addcouponModel');



exports.addCoupon = async (req,res)=>{
    try{
       const data = req.body;
       if(!req.user.isAdmin){
        return res.status(400).json({
            error:true,
            message:'Unauthorized to add coupon'
        });
       }
       if(!data.name || !data.description || !data.discountType ||!data.discountValue || !data.minimumValue){
        return res.status(404).json({
            error:true,
            message:'Some required fields are missing'
        });
       }
       const couponResult = await coupon.create({
           name:data.name,
           description:data.description,
           discountType:data.discountType,
           discountValue:data.discountValue,
           minimumValue:data.minimumValue
       });

       if(!couponResult){
        return res.status(404).json({
            error:true,
            message:'Something went wrong'
        });
       }else{
        return res.status(201).json({
            error:false,
            data:couponResult,
            message:'Coupon created successfully'
        });
       }
       
    }catch (e){
       return res.status(500).json({
            error:true,
            message:e
        });
    }
}