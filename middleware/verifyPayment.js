

exports.verifyPayment = (req,res,next)=>{
    const paymentType = req.body.paymentType;
    if(!paymentType){
        return res.status(400).json({error:true, message: 'PaymentType is required'});
    }
    if (paymentType !== 'COD') {
        const transactionId = req.body.transactionId;
        if(!transactionId){
            return res.status(400).json({error:true, message: 'Transaction ID is required' });
        }
        if (!isValidTransactionId(transactionId)) {
            return res.status(400).json({error:true, message: 'Invalid transaction ID' });
        }
    }
    // Payment verification passed, proceed to next middleware
    console.log("payment checked");
    next();
}

function isValidTransactionId(transactionId){
    return true;
}