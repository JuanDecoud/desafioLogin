import services  from '../services/index.js'


export default class CartController {
    createCart = ()=> {
        async(req,res)=>{
            let productId = req.body.productId
            let quantity = req.body.quantity
        
            try {
              let result = await cartService.create(
                {
                    products : [
                        {
                            product : productId,
                            quantity:quantity
                        }
                    ]
                }
              )
              
            
                await services.userService.update()
              
              let objet = {
                pathname:'/views/products',
                query :{
                    cartId :cartid
                } 
              }
        
              res.status(200).redirect(url.format(objet))
            }catch (err){
                res.json ({status : "error" , message : err.message })
            }
        }
    }
}