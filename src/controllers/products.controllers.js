import productService from '../services/index.js'


export default class productControllers {

export default  addProductController = async (req,res) => {
    
    if (!req.file)res.status (400).json ({message : 'Please, upload product image'})
    const {name,description ,brand ,container,price,code,stock , category , liters} = req.body
    if (!name || !description ||!container ||!brand || !price || !code || !stock || !category || !liters)res.status(400).send ("All fields are required")
    else {
        try {
            let validate = await productModel.find({code :code})
            if (validate.length ===0){
                await productService.create ({name,container,description,brand,price,liters,code,stock,status :true,category ,linkThubnail:'/'+req.file.filename})
                let products = await productService.getAll().lean()
                let io = req.app.get('socketio')
                io.emit('updateProducts' , products)
                res.status(200).json ({mesage : `Sucess : product added successfully`} )
            }
            else {
                res.status(406).json({message : `Product already exists`})
            }
        }
        catch (err){
            res.status(404).json({status: 'error' , error : err.message})
        }   
    }
}
    
