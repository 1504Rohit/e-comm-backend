const Coupon = require('../../model/addcouponModel');

exports.applyCoupon = async(req,res)=>{
    const getCoupon = req.query.couponId;
    try{
       if(!getCoupon){
        return res.status(404).json({
            error:true,
            message:'Couponid is required field'
        });
       }
       const coupon = await Coupon.findById(getCoupon);

       if(!coupon){
        return res.status(404).json({
            error:true,
            message:'Coupon not found'
        });
       }else{
          const discountAmount = coupon.discountValue;
          return res.status(200).json({
            error:false,
            discount:discountAmount,
            message:'Coupon is successfully applied'
        });
       }


    }catch (e){
        return res.status(500).json({
            error:true,
            message:e
        });
    }
}