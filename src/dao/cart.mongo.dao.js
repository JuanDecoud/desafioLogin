import cartModel from "./models/cart.model.js"

export default class CartDao {
    getAll = async ()=> await this.dao.getAll()
    getById = async (id)=> await this.dao.getById(id)
    create = async (data)=> {
        try {
            let result = await cartModel.create(data)
            return result 
        } catch (error) {
            console.log(error)
            return null
        }

    }
    update = async (id,data) => await this.dao.update(id,data)
    delete = async (id) => await this.dao.delete(id)
    findbyAttribute = async (attribute ,value )=>await this.dao.findbyAttribute(attribute,value)
    paginate = async (filter , filterOptions)=>await this.dao.paginate(filter ,filterOptions)
}