const Cart = require('../../model/cartModel');


exports.getCartItem = async(req,res)=>{
  if(!req.user){
    return res.status(400).json({
      error:true,
      message:"Unauthorized.."
    });
   }
        const userId = req.params.userId;
        if(!userId){
          return  res.status(404).json({error:true, message: 'User Id is missing please add userId' });
        }
        
        try {
          const cartItems = await Cart.find({ userId: userId }).populate('product').exec();
          console.log(cartItems);
          var totalPrice = calculateTotalPrice(cartItems);
          console.log(totalPrice);
          if (cartItems && cartItems.length > 0) {
            res.status(200).json({error:false, data:cartItems, totalPrice:totalPrice, message:`${cartItems.length} items Successfully fetched`});
          } else {
            res.status(404).json({error:true, message: 'No cart items exists for the user.' });
          }
        } catch (error) {
          console.error('Error fetching cart items:', error);
          res.status(500).json({error:true, message:'Internal server error' });
        }
}

const calculateTotalPrice = (items) => {
  let totalPrice = 0;

  items.forEach((item) => {
    const price = parseFloat(item.product.price); 
    const quantity = item.quantity;
    totalPrice += price * quantity;
  });

  return totalPrice;
};