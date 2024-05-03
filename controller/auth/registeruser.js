const User = require('../../model/authModel');
const jwt = require("jsonwebtoken");
var validator = require("email-validator");
 
exports.Register = async(req,res)=>{
    try{
        const {email,phone,name,isAdmin} = req.body;
        if(!phone || !email || !name || !isAdmin){
            return res.status(400).json({error:true, message:'Some required field is missing'});
        }
        if(phone.length<10){
            return res.status(400).json({error:true, message:'Please enter 10 digit number'});
        }
        const validate = validator.validate(email);
        if(!validate){
            return res.status(400).json({error:true, message:'Please enter a valid email'});
        }
        const isUserexist = await User.findOne({phone});
        if(isUserexist){
           return res.status(201).json({error:true, data:{}, message:'User already exist'});
        }else{
            const result = await User.create({
                name:name,
                email:email,
                phone:phone,
                isAdmin:isAdmin
            });
            const token = generateToken(result);
            res.status(201).json({error:false, data:result, message:'User successfully registered',token:token});
        }
    }catch (e){
        return res.status(400).json({error:true, message:e});
    } 
}
function generateToken(user) {
    const payload = {
        id: user._id, 
        email: user.email,
        isAdmin:user.isAdmin
    };
    const secretKey = 'rohit@1234'; 
    const expiresIn = '30d';

    return jwt.sign(payload, secretKey, { expiresIn });
}