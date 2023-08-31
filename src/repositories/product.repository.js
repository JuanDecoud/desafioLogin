import productDao from "../dao/product.mongo.dao.js"

export default class ProductRepository {
    constructor (dao){
        this.dao = dao
    }
    getAll = async ()=> await this.dao.getAll()
    getById = async (id)=> await this.dao.getById()
    create = async (data)=> await this.dao.create()
    update = async (id,data) => await this.dao.update()
    delete = async (id) => await this.dao.delete()
}


