

const Cart = require('../../model/cartModel');

exports.addTocart = async(req,res)=>{
     
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
        const cart = await Cart.find({product:productId.toString()}).populate('product').exec();;
        
        if(cart.length == 0){
          const cartItem = new Cart({
            userId,
            product:productId,
            quantity: quantity || 1 
          });
          await cartItem.save();
      
          return res.status(201).json({error:false,data:cartItem, message: 'Product added to cart successfully' });
        }else{
          console.log(cart.id);
          const updated = await Cart.findOneAndUpdate(
            {_id:cart[0].id},
            {
              userId: cart[0].userId,
              product:productId,
              quantity:cart[0].quantity + quantity, 
            },
            {new:true}
          );
          console.log(updated);
          return res.status(201).json({error:false,data:updated, message: 'Product added to cart successfully' });
        }
       
      } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error:true,message: 'Internal server error' });
      }
}