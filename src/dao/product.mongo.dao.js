import productModel from './models/product.model.js'

export default class productDao {
  getAll = async ()=>{
    try {
       let result = await productModel.find().lean()
       return result ;
      
    } catch (error) {
        console.log(error)
        return null
    }
  } 

  findbyAttribute = async (attribute , value)=>{
    try {
      
      let result = await  productModel.find({'code':value})
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }

  getById = async (id)=>{
    try {
      let result = await productModel.findById(id)
      return result 
    } catch (error) {
      console.log(error)
      return null
    }
 } 
  create = async (data)=>{
    try {
      console.log(data)
      let result = await productModel.create(data)
      return result ;
    } catch (error) {
      console.log(error)
      return null
    }
  }
   
  update = async (id,data) =>
  {
    try {
      let result = await productModel.findByIdAndUpdate(id,data, {returnDocument :'after'})
      return result ;
    } catch (error) {
      console.log(error)
      return null
    }
  } 
  delete = async (id) => 
  {
    try {
      let result = await productModel.findByIdAndRemove(id)
    } catch (error) {
      console.log(error)
      return null ;
    }
  }

  paginate = async (filter , filterOptions)=>{
    try {
      let result = await productModel.paginate(filter,filterOptions)
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }

  productsMocking =async (req,res) => {
    try {
      
      
    } catch (error) {
       console.log(error)
       return null
    }
  }

}