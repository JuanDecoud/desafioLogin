import productModel from './models/product.model.js'

export default class productDao {
  getAll = async ()=> await productModel.find().lean()
  getById = async (id)=> await productModel.findById(id)
  create = async (data)=> await productModel.create(data)
  update = async (id,data) => await productModel.findByIdAndUpdate(id,data, {returnDocument :'after'})
  delete = async (id) => await productModel.findByIdAndRemove(id)

}