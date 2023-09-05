import { Server } from 'socket.io'
import services from '../services/index.js'
import { comprobateMongoId } from '../utils/utils.js'
import UserDTO from '../dto/user.dto.js'

export default class CartController {

  createCart = async(req,res)=>{
      let productId = req.body.productId
      let quantity = req.body.quantity
      let user = services.userService.getById(req.session.passport.user)
      try {
        let result = await services.cartService.create(
          {
              products : [
                  {
                      product : productId,
                      quantity:quantity
                  }
              ]
          }
        )
        if(!user.cartId)await services.userService.update(req.session.passport.user,{cartId:result._id})
        res.status(200).redirect('/views/products')
      }catch (err){
          res.json ({status : "error" , message : err.message })
      }
        
  }

  updateCart = async(req,res)=>{
      const productId = req.params.pid
      const cartId = req.params.cid
      let quantity = req.body.quantity || 1
   
      if (productId!=undefined && cartId != undefined){
          let validateId = comprobateMongoId(productId)
          if (validateId=== true){
              try{
                  let cartdb = await services.cartService.getById(cartId)
                  let productdb = await services.productService.getById(productId)
                  if (!productdb)res.status(400).json ({status : ' Fail' , Message : 'Product does not exist'})
                  if (!cartdb)res.status(400).json ({status : ' Fail' , Message : ' Cart does not exist'})
                  if (cartdb && productdb){
                      let result =  cartdb.isProductatCard(productId)
                      if (result ===true ){
                          await cartdb.updateQuantity( productId ,quantity)
                          await services.cartService.update({'_id': cartId},{$set: { ...cartdb}})
                          res.status(200).redirect('/views/products')
                      }
                      else {
                          cartdb.products.push({product : productdb._id , quantity : quantity}  )
                          await services.cartService.update({'_id': cartId},{$set: { ...cartdb}})
                          res.status(200).redirect('/views/products')
                      }
              }
              }catch (err){
                  res.json ({status : "error" , message : err.message })
              }
          }else  res.status(400).json({status: "Error" , message : "Invalidad Id"}) 
      }
 
    }

    findCart = async (req,res)=>{
      try{
          let cartId = req.params.cid
          let cart = await services.cartService.getById(cartId)
          res.status(200).json({cart})
          if(!cart)res.status(200).json ({status :'Fail' , message: 'Cart does not exist'})
      }catch (err){
          res.json ({status : "error" , message : err.message })
      }
   
  }
  

  showUserCart = async (req,res)=>{
    try {
        let user = await services.userService.getById(req.session.passport.user)
        let cart = await services.cartService.findOnePopulatebycartId(user.cartId)
        if(cart)res.render ('userCart' , {cart})
        else res.status(404).json({message:"no cart for show"})
        
    } catch (error) {
        console.log(error)
        res.status(404).json({message: "error"})
    }

  }

  deleteProduct = async(req,res)=>{
      const cid = req.params.cid
      const pid = req.params.pid
      try{
          const cart = await services.cartService.getById(cid)
          if(cart){
              
              let result =await cart.isProductatCard(pid)
              if (result ===true){
                  await cart.deleteProduct(pid)
                  await services.cartService.update({'_id':cid}, {$set : {...cart}} )
                  res.status(200).json({status: "Sucess" , message : "Product deleted"})
              }
              else res.status(200).json({status: "Error" , message : "Product wasnt at card"})
          }else res.status(200).json({status: "Error" , message : "Cart doesnt exist"})
      }catch (err){
          res.json ({status : "error" , message : err.message })
      }
  }

  putProductArray = async(req,res)=>{

    const cartId = req.params.cid
    let arrayProducts = req.body 
    let result = comprobateMongoId(cartId)
    if (result === true){
        try{
            let cart = await services.cartService.getById(cartId)
            if (cart){
                if(arrayProducts){
                    cart.products = arrayProducts
                    await services.cartService.update(cartId, {$set : {...cart}} )
                    res.status(200).json({status: "Sucess" , message : "Products Added to cart"})
                }else res.status(400).json({status: "Error" , message : "No products Selected"})
            }else res.status(200).json({status: "Error" , message : "Cart doesnt exist"})
        }catch (err){
            res.json ({status : "error" , message : err.message })
        }    
    }
    else  res.status(400).json({status: "Error" , message : "Invalidad Id"}) 
  
}

 finishPurchase = async (req,res)=>{
    try {
        let userDto = new UserDTO ( services.userService.getById(req.session.passport.user))
        const cartId = req.params.cid
        let cart = await services.cartService.getById(cartId)
        if(cart){
            let products = cart.products
            let productsatTicket = []
            let nonStockProducts = []
            products.forEach( async objet => {
                if(objet.product.stock >= objet.quantity){
                    productsatTicket.push(objet)
                    let newStockObjet = await services.productService.getById(objet.product._id)
                    newStockObjet.stock -= objet.quantity
                    await services.productService.update(objet.product._id ,newStockObjet )
                }
                else {
                    nonStockProducts.push(objet)
                }
            });
            cart.products = nonStockProducts
            await services.cartService.update(cart._id , cart)
            
            if (productsatTicket.length > 0){
                
              let result = await  services.ticketService.create(productsatTicket ,userDto)
              res.status(200).json({status : "ok" , message : 'ticket creado con exito' , ticket : result})
            }
            else {
                res.status(404).json({status : "Error" , message : 'No hay stock disponibles' })
            }
    
        }else {
    
        }
        
    } catch (error) {
        console.log(error)
        return null
    }

 }

}
