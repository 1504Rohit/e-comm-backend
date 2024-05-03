const Cart = require('../../model/cartModel');


exports.decreaseQuantity = async(req,res)=>{
    try {
        if(!req.user){
          return res.status(400).json({
            error:true,
            message:"Unauthorized.."
          });
         }
        
          const { userId, productId, quantity } = req.body;
  
          if(!userId || !productId || !quantity){
            return res.status(404).json({ error:true,message: 'Some required field is missing' });
          }
          const cart = await Cart.find({product:productId.toString()});
          console.log(Cart);
          
            console.log(cart[0].id);
            const updated = await Cart.findOneAndUpdate(
              {_id:cart[0].id},
              {
                userId: cart[0].userId,
                product:productId,
                quantity:cart[0].quantity - quantity, 
              },
              {new:true}
            );
            console.log(updated);
            return res.status(201).json({error:false,data:updated, message: 'Quantity decrease successfully' });
          
         
        } catch (error) {
          console.error('Error adding product to cart:', error);
          return res.status(500).json({ error:true,message: 'Internal server error' });
        }
}