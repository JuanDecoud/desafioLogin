import cartModel from "./models/cart.model.js"

export default class CartDao {
    getAll = async ()=> await this.dao.getAll()

    findOnePopulatebycartId = async (cid)=> {
        try {
            let result = cartModel.findOne({'_id' : cid}).populate().lean()
            return result 
        } catch (error) {
            console.log(error)
            return null
        }
    }

    getById = async (id)=> {
        try {
            let result = await cartModel.findById(id)
            return result ;
        } catch (error) {
            console.log(error)
            return null
        }
    }

    create = async (data)=> {
        try {
            let result = await cartModel.create(data)
            return result 
        } catch (error) {
            console.log(error)
            return null
        }

    }
    update = async (id,data) => {
        try {
            let result = await cartModel.findByIdAndUpdate(id,data, {returnDocument :'after'})
            return result ;
        } catch (error) {
            console.log(error)
            return null
        }
    }
    delete = async (id) => await this.dao.delete(id)
    findbyAttribute = async (attribute ,value )=>await this.dao.findbyAttribute(attribute,value)
    paginate = async (filter , filterOptions)=>await this.dao.paginate(filter ,filterOptions)
}