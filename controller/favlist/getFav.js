const Favorite = require('../../model/favModel');

exports.getFav = async(req,res)=>{
    try{
        if (!req.user) {
            return res.status(400).json({
                error: true,
                message: 'Unauthorized..'
            });
        }
        const userId = req.query.userId;
        if (!userId) {
            return res.status(400).json({
                error: true,
                message: "UserId is required"
            });
        }

        const data = await Favorite.find({ userId: userId }).populate('product').exec();
        
        if(!data){
            return res.status(404).json({
                error: true,
                message: "Something went wrong" 
            });
        }
        return res.status(200).json({
            error: false,
            data:data,
            message: "Fav list fetched successfully" 
        });
        
        

    }catch (e){
        return res.status(500).json({
            error: true,
            message: e.message 
        });
    }
}