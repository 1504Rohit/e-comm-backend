
const {product} = require('../../model/product');

exports.addProduct = async(req,res)=>{
   try{
    const {name , price , description,quantity,category,productType,forGender} =  req.body;
    if(!req.user.isAdmin){
        return res.status(400).json({
            error:true,
            message:'Unauthorized ..'
        });
    }
    if(!name || !price  || !quantity || !category || !productType || !forGender){
        return res.status(404).json({error:true,product:{},message:'Some required fields are missing'});
    } 
    console.log(req.files);
    const resData = await product.create({
        name: name,
        description: description ? description :"",
        price: price,
        productImage: req.files.productImage ? req.files.productImage[0].path : '',
        images: req.files.images ?req.files.images.map(file => file.path) : [],
        quantity:quantity,
        soldQuantity:0,
        category:category,
        productType:productType,
        forGender:forGender
    });
    if(!resData){
        return res.status(404).json({error:true,product:{},message:'Something went wrong'});
    }
    else{
        return res.status(201).json({error:false,product:resData,message:'Product added successfully'});
    }
   }catch (e){
        return res.status(500).json({message:e});
   }
}







