
const Profile = require('../../model/authModel');
var validator = require("email-validator");
const jwt = require("jsonwebtoken");

exports.update = async(req,res)=>{
        const {name,email,phone,profilePic} = req.body;
        const userId = req.query.userId;

        if(!phone || !email || !name || !userId){
            return res.status(400).json({error:true, message:'Some required field is missing'});
        }
        if(phone.length<10){
            return res.status(400).json({error:true, message:'Please enter 10 digit number'});
        }
        const validate = validator.validate(email);

        if(!validate){
            return res.status(400).json({error:true, message:'Please enter a valid email'});
        }

        try{
            const data = await Profile.findOneAndUpdate(
                { _id: userId },
                { 
                     name:name,
                     email:email,
                     phone:phone,
                     profilePic:profilePic

                },
                { new: true } 
              );
              if(!data){
                return res.status(404).json({
                    error:true,
                    message:'User not found'
                });
               }else{
                return res.status(201).json({
                    error:false,
                    data:data,
                    message:'User updated successfully',
                    token:generateToken(data)
                });
               }
        }catch(e){
           return res.status(400).json({error:true, message:e});
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