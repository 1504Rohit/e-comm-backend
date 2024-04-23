

exports.sendOTP = (req, res)=>{
    const phone = req.query.phoneNumber;;

    if(!phone){
       return res.status(400).json({error:true,message:"Phone number is required field"});
    }else if(phone.length<10){
        return res.status(400).json({error:true,message:"Phone number must be 10 characters"});
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    return res.status(200).json({error:false,message:"OTP send to your phone",status:200});

}