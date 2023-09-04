import ticketModel from "./models/ticket.model.js"


export default  class TicketMongoDAO {

    create = async (data)=>{
        try {
            
            let ticket = await ticketModel.create(data)
            return ticket
            
        } catch (error) {
            console.log (error)
            return null
        }
    }

}