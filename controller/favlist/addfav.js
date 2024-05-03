const Favorite = require('../../model/favModel');

exports.addFav = async (req, res) => {
  
        try {
            if(!req.user){
              return res.status(400).json({
                error:true,
                message:"Unauthorized.."
              });
             }
            
              const { userId, productId } = req.body;
      
              if(!userId || !productId ){
                return res.status(404).json({ error:true,message: 'Some required field is missing' });
              }
            
          
              const fav = new Favorite({
                userId,
                product:productId,
              });
          
              
              await fav.save();
          
              res.status(201).json({error:false,data:fav, message: 'Product added to fav successfully' });
            } catch (error) {
              res.status(500).json({ error:true,message:error});
            }

}
