import mongoose from 'mongoose';

const ticketCollection = "ticket"


const ticketSchema = new mongoose.Schema({
 code : String ,
 purchase_datetime : String,
 amount : Number,
 purchase: String
})

const ticketModel = mongoose.model(ticketCollection,ticketSchema)

export default ticketModel