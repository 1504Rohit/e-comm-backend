const {product} = require('../model/product');
const Cart = require('../model/cartModel');

exports.checkQuantity = async(req,res,next)=>{
   const {productId,type,userId} = req.body;
   
   if(!userId){
    return res.status(400).json({
       error:true,
       message:"UserId is required"
    });
  }
   if(!type){
    return res.status(400).json({
       error:true,
       message:"Type is required"
    });
  }

  if(type==1){
    if(!productId){
        return res.status(400).json({
           error:true,
           message:"ProductId is required"
        });
      }
    const item = await product.findById(productId);
    if(item.quantity<=0){
        return res.status(400).json({
            error:true,
            message:"Item is out of stock"
         });
    }
  }else{
    const cartItems = await Cart.find({ userId: userId }).populate('product').exec();
    console.log(cartItems);
    for(let i =0;i<cartItems.length;i++){
        if(cartItems[i].product.quantity<=0 || cartItems[i].product.quantity<cartItems[i].quantity){
            return res.status(404).json({
                error:true,
                data:cartItems[i].product.id,
                message:"Product of given id is out of stock.."
            });
        }
    }
  }
   
 console.log('quantity checked');

  next();

}