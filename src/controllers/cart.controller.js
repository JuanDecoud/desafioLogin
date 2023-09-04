import Services  from '../services/index.js'
import { comprobateMongoId } from '../utils/utils.js'


export default class CartController {

  createCart = async(req,res)=>{
      let productId = req.body.productId
      let quantity = req.body.quantity
      let user = Services.userService.getById(req.session.passport.user)
      try {
        let result = await Services.cartService.create(
          {
              products : [
                  {
                      product : productId,
                      quantity:quantity
                  }
              ]
          }
        )
        if(!user.cartId)await Services.userService.update(req.session.passport.user,{cartId:result._id})
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
                  let cartdb = await Services.cartService.getById(cartId)
                  let productdb = await Services.productService.getById(productId)
                  if (!productdb)res.status(400).json ({status : ' Fail' , Message : 'Product does not exist'})
                  if (!cartdb)res.status(400).json ({status : ' Fail' , Message : ' Cart does not exist'})
                  if (cartdb && productdb){
                      let result =  cartdb.isProductatCard(productId)
                      if (result ===true ){
                          await cartdb.updateQuantity( productId ,quantity)
                          await Services.cartService.update({'_id': cartId},{$set: { ...cartdb}})
  
                         /* let cartid = cartdb._id.toString()
                          let objet = {pathname:'/views/products',query :{cartId :cartid} }*/
                          res.status(200).redirect('/views/products')
                      }
                      else {
                          cartdb.products.push({product : productdb._id , quantity : quantity}  )
                          await Services.cartService.update({'_id': cartId},{$set: { ...cartdb}})
                         /* let cartid = cartdb._id.toString()
                          let objet = {pathname:'/views/products',query :{cartId :cartid} }*/
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
          let cart = await Services.cartService.getById(cartId)
          res.status(200).json({cart})
          if(!cart)res.status(200).json ({status :'Fail' , message: 'Cart does not exist'})
      }catch (err){
          res.json ({status : "error" , message : err.message })
      }
   
  }

  deleteProduct = async(req,res)=>{
      const cid = req.params.cid
      const pid = req.params.pid
      try{
          const cart = await Services.cartService.getById(cid)
          if(cart){
              
              let result =await cart.isProductatCard(pid)
              if (result ===true){
                  await cart.deleteProduct(pid)
                  await Services.cartService.update({'_id':cid}, {$set : {...cart}} )
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
            let cart = await Services.cartService.getById(cartId)
            if (cart){
                if(arrayProducts){
                    cart.products = arrayProducts
                    await Services.cartService.update(cartId, {$set : {...cart}} )
                    res.status(200).json({status: "Sucess" , message : "Products Added to cart"})
                }else res.status(400).json({status: "Error" , message : "No products Selected"})
            }else res.status(200).json({status: "Error" , message : "Cart doesnt exist"})
        }catch (err){
            res.json ({status : "error" , message : err.message })
        }    
    }
    else  res.status(400).json({status: "Error" , message : "Invalidad Id"}) 
  
}

}
