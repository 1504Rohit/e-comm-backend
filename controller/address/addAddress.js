const {Address} = require('../../model/createOrderModel');

exports.addAddress = async(req,res)=>{
    try{
        const {address1,address2,landMark,city,State,pinCode} = req.body;
        if(!req.user){
            return res.status(400).json({
              error:true,
              message:"Unauthorized.."
            });
           }
        
        const userId = req.query.userId;
        if(!userId){
            return res.status(400).json({
                error:true,
                message:"UserId is required"
            });
        }
        if(!address1 || !landMark || !city || !State || !pinCode){
            return res.status(400).json({
                error:true,
                message:"Some required fields are missing"
            });
        }
        const data = await Address.create({
            userId:userId,
            address1:address1,
            address2:address2,
            landMark:landMark,
            city:city,
            State:State,
            pinCode:pinCode
        });

        if(!data){
            return res.status(201).json({
                error:true,
                message:"Something went wrong"
            });
        }else{
            return res.status(201).json({
                error:false,
                data:data,
                message:"Address created successfully"
            });
        }
    }catch (e){
        return res.status(500).json({
            error:true,
            message:e
        });
    }
}