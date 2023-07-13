import mongoose from 'mongoose'

let userCollection = "Users"

const userSchema = new mongoose.Schema({
    name : String ,
    lastName : String,
    contry : String,
    city : String,
    adress : String,
    userName : String ,
    password: String ,
    category : String,
    status : {
        type:Boolean,
        default : true
    }

})


const userModel = mongoose.model(userCollection,userSchema)

export default userModel