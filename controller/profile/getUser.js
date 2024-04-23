const Profile = require('../../model/authModel');
const jwt = require("jsonwebtoken");


exports.getUser = async(req,res)=>{
    try{
       const userId = req.query.userId;
       if(!userId){
        return res.status(404).json({
            error:true,
            message:'UserId is required'
        });
       }
       const data = await Profile.findById(userId);
       if(!data){
        return res.status(404).json({
            error:true,
            message:'No user found'
        });
       }else{
        return res.status(200).json({
            error:false,
            user:data,
            message:'User fetched successfully',
            token:generateToken(data)
        });
       }
    }catch (e){
        return res.status(500).json({
            error:true,
            message:e
        });
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