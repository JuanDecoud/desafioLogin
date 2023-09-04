import userModel from   '../dao/models/user.model.js'

export default  class UserDao {
    getAll = async ()=> {
        try {
            let result = userModel.find().lean()
            return result ;
        } catch (error) {
            console.log(error)
            return null
        }
    }
    getById = async (id)=> {
       try {
        let result = await userModel.findById(id)
        return result

       } catch (error) {
            console.log(error)
            return null
       }
    }
    create = async (data)=> {
        try {
            let result = await userModel.create(data)
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    update = async (id,data) => {
        try {
            let result = await userModel.findByIdAndUpdate(id,data,{returnDocument :'after'})
            return result
        } catch (error) {
            console.log(error)
            return null
        }
    }
    delete = async (id) => await this.dao.delete(id)
    findbyAttribute = async (attribute ,value )=>await this.dao.findbyAttribute(attribute,value)
    paginate = async (filter , filterOptions)=>await this.dao.paginate(filter ,filterOptions)
}