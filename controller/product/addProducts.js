
const {product} = require('../../model/addproduct');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

exports.addProduct = async(req,res)=>{
   try{
    console.log(req.body)
    const {name , price , description} =  req.body;
    if(!name || !price ){
        return res.status(404).json({error:true,product:{},message:'Some required fields are missing'});
    } 
    console.log(req.files);
    const resData = await product.create({
        name: name,
        description: description ? description :"",
        price: price,
        productImage: req.files.productImage ? req.files.productImage[0].path : '',
        images: req.files.images ?req.files.images.map(file => file.path) : []
    });
    if(!resData){
        return res.status(404).json({error:true,product:{},message:'Something went wrong'});
    }
    else{
        const token = generateToken(resData);
        return res.status(201).json({error:false,product:resData,message:'Product added successfully',token:token});
    }
   }catch (e){
        return res.status(400).json({message:e});
   }
}


function generateToken(product) {
    const payload = {
        id: product._id, 
        name:product.name
    };
    const secretKey = 'rohit@1234'; 
    const expiresIn = '12h';
    return jwt.sign(payload, secretKey, { expiresIn });
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    }, 
    filename: (req, file, cb) => {
        cb(null, Date.now()+'-'+file.originalname);
    }
});


exports.upload = multer({
    storage: storage
});

