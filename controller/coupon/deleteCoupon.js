

const coupon = require('../../model/addcouponModel');

exports.deleteCoupon = async(req,res)=>{
    const couponId = req.query.couponId;

    if(!couponId){
        return res.status(404).json({
            error:true,
            message:'CouponId is required'
        });
    }
    try{
       const result = await coupon.findByIdAndDelete(couponId);
       if(!result){
        return res.status(404).json({
            error:true,
            message:'Something went wrong'
        });
       }else{
        return res.status(404).json({
            error:false,
            message:'Coupon deleted successfully'
        });
       }
    }catch (e){
        return res.status(500).json({
            error:true,
            message:e
        });
    }
}