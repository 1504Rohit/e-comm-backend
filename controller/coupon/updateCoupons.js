
const coupon = require('../../model/addcouponModel');

exports.updateCoupon = async(req,res)=>{
    const userId = req.query.couponId;
    const data = req.body;
    if(!req.user.isAdmin){
        return res.status(400).json({
            error:true,
            message:'Unauthorized to update coupon'
        });
    }
    if(!userId){
        return res.status(404).json({
            error:true,
            message:'CouponId is required'
        });
    }
    if(!data.name || !data.description || !data.discountType || !data.discountValue || !data.minimumValue){
        return res.status(404).json({
            error:true,
            message:'Some required fields are missing'
        });
       }
    try{
        const getCoupon = await coupon.findOneAndUpdate(
            { _id: userId },
            {  
                name:data.name,
                description:data.description,
                discountType:data.discountType,
                discountValue:data.discountValue,
                minimumValue:data.minimumValue
            },
            { new: true } 
          );
       if(!getCoupon){
        return res.status(404).json({
            error:true,
            message:'Coupon not found'
        });
       }else{
        return res.status(201).json({
            error:false,
            data:getCoupon,
            message:'Coupon updated successfully'
        });
       }
    }catch (e){
        return res.status(500).json({
            error:true,
            message:e
        });
    }
}