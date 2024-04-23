const {Order} = require('../../model/createOrderModel');
const {product}= require('../../model/addproduct');
const UserModel = require('../../model/authModel');
const {Address} = require('../../model/createOrderModel');
const Cart = require('../../model/cartModel');


exports.CreateOrder = async(req,res)=>{
    try{
       const userId = req.query.userId;
       const {productIds,paymentMethod,transactionId,type,addressId} = req.body;
       if(!type){
        return res.status(404).json({
            error:true,
            message:"Order type is missing"
        });
       }
       const address = await Address.findById(addressId);
       if(!address){
        return res.status(404).json({
            error:true,
            message:"Address not found"
        });
       }

       if(type==1){
           if(!productIds || !paymentMethod){
            return res.status(404).json({
                error:true,
                message:"Some required fields are missing"
            });
           }
           if(!userId){
            return res.status(404).json({
                error:true,
                message:"UserId is required"
            });
           }
           const user = await UserModel.findById(userId);
           if(!user){
            return res.status(404).json({
                error:true,
                message:"No user found"
            });
           }
           let array = [];
           let Price = 0;
           for (let i = 0; i < productIds.length; i++) {
              const getProduct = await product.findById(productIds[i]);
              if(!getProduct){
                return res.status(404).json({
                    error:true,
                    message:"Product not found"
                });
              }
              Price += Number(getProduct.price);
              array.push(getProduct);
           }
           if(paymentMethod==5){
            console.log('inside 5');
            const data = await Order.create({
                userId : userId,
                address:address,
                products:array,
                totalPrice:Price
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
                    address:address,
                    message:"Order successfully created"
                });
            }
           }else{
            console.log('inside others')
            if(!transactionId){
                return res.status(404).json({
                    error:true,
                    message:"TransactionId is required"
                });
            }
            const data = await Order.create({
                userId : userId,
                address:address,
                products:array,
                transactionId:transactionId,
                totalPrice:Price
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
                    address:address,
                    message:"Order successfully created"
                });
            }
           }
       }else{
        if(!paymentMethod){
            return res.status(404).json({
                error:true,
                message:"Some required fields are missing"
            });
           }
           if(!userId){
            return res.status(404).json({
                error:true,
                message:"UserId is required"
            });
           }
           const user = await UserModel.findById(userId);
           if(!user){
            return res.status(404).json({
                error:true,
                message:"No user found"
            });
           }
           
           const cartItems = await Cart.find({ userId: userId }).exec();
           if(!cartItems){
            return res.status(404).json({
                error:true,
                message:"Product not found"
            });
           }
           let array = [];
           for (let i = 0; i < cartItems.length; i++) {
              array.push(cartItems[i].product);
           }
           var totalPrice = calculateTotalPrice(cartItems);
           if(paymentMethod==5){
            console.log('inside 5');
            const data = await Order.create({
                userId : userId,
                address:address,
                products:array,
                totalPrice:totalPrice
            });
            console.log(data);
            if(!data){
                return res.status(404).json({
                    error:true,
                    message:"Something went wrong"
                });
            }else{
                return res.status(201).json({
                    error:false,
                    data:data,
                    address:address,
                    message:"Order successfully created"
                });
            }
           }else{
            console.log('inside others')
            if(!transactionId){
                return res.status(404).json({
                    error:true,
                    message:"TransactionId is required"
                });
            }
            const data = await Order.create({
                userId : userId,
                address:address,
                products:array,
                transactionId:transactionId,
                totalPrice:totalPrice
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
                    address:address,
                    message:"Order successfully created"
                });
            }
           }
       }
    }catch(e){
        return res.status(500).json({
            error:true,
            message:e
        });
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