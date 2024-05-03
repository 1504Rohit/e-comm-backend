const {product} = require('../../model/product');

exports.updateProduct = async(req,res)=>{
    try{
        const {name,price,description,quantity,category,productType,forGender} =  req.body;
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
        if(!name || !price  || !quantity || !category || !productType || !forGender){
           return res.status(404).json({error:true,product:{},message:'Some required fields are missing'});
        } 
        const resData = await product.findOneAndUpdate(
           { _id: productId },
           {  
            name: name,
            description: description ? description : "",
            price: price,
            productImage: req.files.productImage ? req.files.productImage[0].path : '',
            images: req.files.images ? req.files.images.map(file => file.path) : [],
            quantity:quantity,
            soldQuantity:0,
            category:category,
            productType:productType,
            forGender:forGender
           },
           { new: true } 
        );
    if(!resData){
        return res.status(404).json({error:true , message:'Something went wrong'});
    }
    else{
        return res.status(201).json({error:false,product:resData,message:'Product updated successfully'});
    }

    }catch (e){
        return res.status(500).json({message:e});
    }
}