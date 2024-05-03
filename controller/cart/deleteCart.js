const Cart = require('../../model/cartModel');


exports.deleteCart = async(req,res)=>{
    try{
        if(!req.user){ 
            return res.status(400).json({
               error:true,
               message:"Unauthorized.."
            });
        }
       const id = req.params.id;
       if(!id){
         return res.status(400).json({ error:true,message: 'Id is required' });
       }
       const response = await Cart.findByIdAndDelete(id);
       if(!response){
        return res.status(404).json({ error:true,message: 'Something went wrong' });
       }else{
        return res.status(200).json({ error:false,message: 'Item deleted successfully from cart' });
       }
    }catch(e){
        return res.status(500).json({ error:true,message: 'Internal server error' });
    }
}