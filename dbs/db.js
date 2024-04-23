const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/e-comm').then(()=>{
    console.log("Data Base Connected")
}).catch(()=>{
    console.log("Data Base not Connected due to some error")
})


module.exports = mongoose;