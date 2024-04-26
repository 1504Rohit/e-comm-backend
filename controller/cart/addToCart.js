

const Cart = require('../../model/cartModel');
const {product} = require('../../model/addproduct');

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
          return res.status(404).json({ error: 'Some required field is missing' });
        }
        const data = await product.findById(productId);
        const cartitem = await Cart.findById(productId);
       
        if (!data) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        const cartItem = new Cart({
          userId,
          product: {
            name: data.name,
            description:data.description,
            price:data.price,
            productImage:data.productImage,
            images:data.images
          },
          quantity: quantity || 1 
        });
    
        
        await cartItem.save();
    
        res.status(201).json({error:false,data:data, message: 'Product added to cart successfully' });
      } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}