import { Router } from 'express'
import CartController from '../controllers/cart.controller.js'
import { comprobateAdmin, comprobateLoggueUser, comprobateUser } from '../middlewares/user.middleware.js'

const cartsRouter = Router ()

const cartController = new CartController ()


cartsRouter.post ('/:cid/products/:pid' ,comprobateLoggueUser,comprobateUser ,cartController.updateCart )
cartsRouter.post ('/',comprobateLoggueUser,comprobateUser,cartController.createCart)
cartsRouter.post('/:cid/purchase' ,comprobateLoggueUser,comprobateUser ,cartController.finishPurchase )
cartsRouter.get('/:cid',comprobateLoggueUser,comprobateAdmin,cartController.findCart)
cartsRouter.delete('/:cid/product/:pid',comprobateLoggueUser,comprobateUser ,cartController.deleteProduct)
cartsRouter.put('/:cid' , cartController.putProductArray)



export default cartsRouter