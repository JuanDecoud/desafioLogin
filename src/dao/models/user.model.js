import mongoose from 'mongoose'

let userCollection = "Users"

const userSchema = new mongoose.Schema({
    name : String ,
    lastName : String,
    country : String,
    city : String,
    address : String,
    userName : String ,
    password: String ,
    cartId : {
        type :String ,
        default: null
    },
    category : {
        type:String,
        default : "user"
    },
    status : {
        type:Boolean,
        default : true
    },

})


const userModel = mongoose.model(userCollection,userSchema)

export default userModel