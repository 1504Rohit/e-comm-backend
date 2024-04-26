const User = require("../../model/authModel");
const jwt = require("jsonwebtoken");

exports.loginUser = async(req,res)=>{
   try{
    const OTP = req.query.OTP;
    const {phone} = req.body;
    if(!OTP || !phone){
       return res.status(201).json({error:true,message:'Some required field is missing'});
    }
    const user = await User.findOne({phone});
    if(!user){
        res.status(201).json({error:true,message:'User does\'t exist'});
    }else{
        console.log(OTP);
       if(OTP == 123456){
        const token = generateToken(user);
        res.status(201).json({error:false,user:user,message:'User login successfully',token:token});
       }else{
        res.status(201).json({error:true,message:'Wrong OTP..'});
       }
    }
   }catch (e){
    res.status(400).json({error:true,message:e});
   }
}

function generateToken(user) {
    const payload = {
        id: user._id, 
        email: user.email,
    };
    const secretKey = 'rohit@1234'; 
    const expiresIn = '12h';
    return jwt.sign(payload, secretKey, { expiresIn });
}