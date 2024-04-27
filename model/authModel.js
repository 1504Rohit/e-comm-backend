
const db = require('mongoose');

const UserSchema = db.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
      type:String,
      require:true
    },
    phone:{
        type:Number,
        require:true,
        length:10
    },
    profilePic:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        required:true
    }
})


const User = db.model("User",UserSchema);

module.exports = User;