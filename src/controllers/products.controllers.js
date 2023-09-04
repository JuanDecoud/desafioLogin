import Services from '../services/index.js'
import uploader from '../utils/multer.product.js'


export default class productControllers {

    cpUpload = (req, res, next) => {
        uploader.single('file')
        (req,res, ()=>{next()})
      }

    addProduct = async (req,res) => {
        if (!req.file)res.status (400).json ({message : 'Please, upload product image'})
        const {name,description ,brand ,container,price,code,stock , category , liters} = req.body
        if (!name || !description ||!container ||!brand || !price || !code || !stock || !category || !liters)res.status(400).send ("All fields are required")
        else {
            try {
                let validate = await Services.productService.findbyAttribute("code",code)
                
                if (validate.length ===0){
                    let newProduct = {name,container,description,brand,price,liters,code,stock,status :true,category ,linkThubnail:'/'+req.file.filename}
                    await Services.productService.create (newProduct)
                    let products = await Services.productService.getAll()
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

    showProducts = async (req , res)=>{

        let limit = parseInt(req.query.limit)|| 10
        let page = parseInt(req.query.page) || 1
        let filter = req.query.filter 
        let sort = req.query.sort 
     
        let filterOptions= {limit : limit , page : page  , lean :true}
        if (sort !=undefined){
         let optSort = {sort : {price : sort}}
         filterOptions={...filterOptions , ...optSort}
        } 
        if(filter === undefined) filter = {}
        else filter = {category : filter}
     
        try{
             let result = await Services.productService.paginate(filter, filterOptions)
             let io = req.app.get('socketio')
             io.emit('updateProducts' , result)
             res.status(200).send({ message: "Success" ,result :result})
     
        }catch(err){
             res.json ({status : "error" , message : err.message })
        }
     
     }

     updateProducts = async (req,res)=>{
        let id = req.params.pid
        let update = req.body
    
        try {
            let result = await Services.productService.update(id,update)
            if (result.matchedCount === 0) res.status(404).send ("This product not exist")
            else {
                let products = await Services.productService.getAll().lean()
                let io = req.app.get('socketio')
                io.emit('updateProducts' , products)
                res.status(200).send("Success : Product update")
            }
        }catch (err){
            res.json ({status:'error' , message: err.message })
        }
      
    }

    deleteProduct = async (req,res)=>{
        let id = req.params.pid
       try {
            let result = await Services.productService.delete(id)
            let products = await Services.productService.getAll()
            let io = req.app.get('socketio')
            io.emit('updateProducts' , products)
            res.status(200).send ("Sucess: Product Deleted")
       }catch (err){
            res.json ({status:'error' , message: err.message })
       }
    }

}




    
