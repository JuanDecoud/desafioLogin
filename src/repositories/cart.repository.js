export default class CartRepository {
    constructor (dao){
        this.dao = dao
    }
    findOnePopulatebycartId = async (cid)=>await this.dao.findOnePopulatebycartId(cid)
    getAll = async ()=> await this.dao.getAll()
    getById = async (id)=> await this.dao.getById(id)
    create = async (data)=> await this.dao.create(data)
    update = async (id,data) => await this.dao.update(id,data)
    delete = async (id) => await this.dao.delete(id)
    findbyAttribute = async (attribute ,value )=>await this.dao.findbyAttribute(attribute,value)
    paginate = async (filter , filterOptions)=>await this.dao.paginate(filter ,filterOptions)

}