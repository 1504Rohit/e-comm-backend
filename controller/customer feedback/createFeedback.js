const feedback = require('../../model/customerFeedbackModel');

exports.feedback = async(req,res)=>{

    try{
        const {productId,rating,review} = req.body;
        if(req.user.isAdmin){
            return res.status(400).json({
                error:true,
                message:'Unauthorized ..'
            });
        }
        if(!productId || !rating || !review){
            return res.status(400).json({
                error:true,
                message:"Some required fields are missing"
            });
        }

        const data = await feedback.create({
            productId:productId,
            rating:rating,
            review:review
        });

        if(!data){
            return res.status(404).json({
                error:true,
                message:"Something went wrong"
            });
        }else{
            return res.status(201).json({
                error:false,
                data:data,
                message:"Feedback created successfully"
            });
        }
    }catch (e){
        return res.status(500).json({
            error:true,
            message:e
        });
    }
    
}