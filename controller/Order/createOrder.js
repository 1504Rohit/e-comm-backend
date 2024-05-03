const {Order} = require('../../model/createOrderModel');
const {product}= require('../../model/product');
const UserModel = require('../../model/authModel');
const {Address} = require('../../model/createOrderModel');
const Cart = require('../../model/cartModel');
const Status = require('../../model/orderStatusModel');

exports.CreateOrder = async(req,res)=>{
    console.log('come to create order');
    try{
        if(req.user.isAdmin){
            return res.status(400).json({
                error:true,
                message:'Unauthorized..'
            });
        }
       const {userId} = req.body;
       const user = await UserModel.findById(userId);
       if(!user){
        return res.status(404).json({
            error:true,
            message:"No user found"
        });
       }
       const {productId,transactionId,type,addressId} = req.body;
       const address = await Address.findById(addressId);

       if(type==1){
        console.log('inside type 1');
        const getProduct = await product.findById(productId);
        const data = await Order.create({
            userId : userId,
            address:address,
            products:getProduct,
            transactionId:transactionId || "",
            totalPrice:getProduct.price
        });
        if(!data){
            return res.status(404).json({
                error:true,
                message:"Something went wrong"
            });
        }else{
            const update = await product.findByIdAndUpdate(
                { _id: getProduct.id },
                {
                    name: getProduct.name,
                    description:getProduct.description,
                    price: getProduct.price,
                    productImage: getProduct.productImage,
                    images:getProduct.images,
                    quantity:getProduct.quantity-1,
                    soldQuantity:getProduct.soldQuantity+1
                },
                { new: true } 
            );
            const status = Status.create({
                userId:userId,
                orderId:data._id,
                status:"Order created successfully",
                statusCode:1
            });
            return res.status(201).json({
                error:false,
                data:data,
                address:address,
                message:"Order successfully created"
            });
        }

       }else{
        console.log('inside type 2');
          const cartItems = await Cart.find({ userId: userId }).populate('product').exec();
          let array = [];
          for(let i=0;i<cartItems.length;i++){
             array.push(cartItems[i].product);
          }
          console.log(cartItems);
          console.log(address);
          const data = await Order.create({
              userId : userId,
              address:address,
              products:array,
              transactionId:transactionId,
              totalPrice:calculateTotalPrice(cartItems)
           });
           console.log("order created")
           if(!data){
            return res.status(404).json({
                error:true,
                message:"Something went wrong"
            });
           }else{
            for (let i = 0; i < cartItems.length; i++) {
                const getProduct = await product.findById(cartItems[i].product.id);
                console.log(getProduct);
                console.log(getProduct.id);
                console.log(getProduct.name);
                const update = await product.findByIdAndUpdate(
                    { _id: getProduct.id },
                    {
                        name: getProduct.name,
                        description:getProduct.description,
                        price: getProduct.price,
                        productImage: getProduct.productImage,
                        images:getProduct.images,
                        quantity:getProduct.quantity-cartItems[i].quantity,
                        soldQuantity:getProduct.soldQuantity+cartItems[i].quantity
                    },
                    { new: true } 
                );
                const data = await Cart.findByIdAndDelete(cartItems[i].id);
             }
            const status = Status.create({
                userId:userId,
                orderId:data._id,
                status:"Order created successfully",
                statusCode:1
            });
            return res.status(201).json({
                error:false,
                data:data,
                address:address,
                message:"Order successfully created"
            });
        }
       }
    }catch(e){
        return res.status(500).json({
            error:true,
            message:e
        });
    }
}

const calculateTotalPrice = (items)=>{
    let totalPrice = 0;
    items.forEach((item) => {
      const price = parseFloat(item.product.price); 
      const quantity = item.quantity;
      totalPrice += price * quantity;
    });
    return totalPrice;
};