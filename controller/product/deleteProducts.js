const {product} = require('../../model/product');

exports.deleteProducts = async(req,res)=>{
    try{
        const productId = req.params.id;
        if(!productId){
            return res.status(400).json({
                error:true,
                message:'ProductId is required'
            });
        }
        if(!req.user.isAdmin){
           return res.status(400).json({
              error:true,
              message:'Unauthorized ..'
            });
        }
        
        const response = await product.findByIdAndDelete(productId);

        if(!product){
            return res.status(400).json({
                error:true,
                message:'Something went wrong'
              });
        }else{
            return res.status(200).json({
                error:false,
                message:'Product deleted successfully'
              });
        }
    }catch (e){
        return res.status(500).json({message:e});
    }
}