

exports.checkAddress = (req,res,next)=>{
    const addressId = req.body.addressId;
    if (!addressId) {
        return res.status(400).json({ error:true,message: 'Invalid address or address not found' });
    }
    console.log('address checked');
    next();
}