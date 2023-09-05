import ticketModel from "./models/ticket.model.js"
import services from "../services/index.js";
import moment from 'moment'

import { v4 as uuidv4 } from 'uuid';

const v4options = {
    random: [
      0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36,
    ],
  };

export default  class TicketMongoDAO {

    generateCode =  ()=> {
        let code = uuidv4(v4options)
        return code
    }

    calculatePayment = async (arrayProducts)=> {
    
        let value = 0 
        arrayProducts.forEach( async objet => {
            let price = objet.product.price
            console.log(price)
            let quantity =objet.quantity
            let final = quantity*price
             value+= final
             
        });
        return   value
    }

    create = async (arrayProducts , user )=>{
        try {
            let email = user.email
            let date = moment().format('MMMM Do YYYY, h:mm:ss a').toString()
            let code = this.generateCode()
            let payment = await this.calculatePayment(arrayProducts)
            let data = { code : code ,purchase_datetime : date,amount : payment,purchase: email}
            let ticket = await ticketModel.create(data)
            return ticket
            
        } catch (error) {

            console.log (error)
            return null
        }
    }

 

}