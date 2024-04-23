

const {product} = require('../../model/addproduct');

exports.getProducts= async(req,res)=>{
    try{
      const products = await product.find();
     
      if(!products){
        return res.status(404).json({error:true,data:{},message:'Products not found'});
      }else{
        return res.status(200).json({error:false,data:products,message:`${products.length} products found`,});
      }
    }catch (e){
        res.status(404).json({error:true,data:{},message:e});
    }
}

