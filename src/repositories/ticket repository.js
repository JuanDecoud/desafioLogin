export default class TicketRepository {
    constructor (dao){
        this.dao = dao
    }
    create = async (arrayProducts,userEmail )=> await this.dao.create(arrayProducts , userEmail )
    calculatePayment = async (arrayProducts)=>  this.dao.calculatePayment(arrayProducts)
    
 }
