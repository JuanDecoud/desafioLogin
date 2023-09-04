import { Router } from 'express'
import CartController from '../controllers/cart.controller.js'

const cartsRouter = Router ()

const cartController = new CartController ()


cartsRouter.post ('/:cid/products/:pid' ,cartController.updateCart )
cartsRouter.post ('/',cartController.createCart)
cartsRouter.get('/:cid',cartController.findCart)
cartsRouter.delete('/:cid/product/:pid', cartController.deleteProduct)
cartsRouter.put('/:cid' , cartController.putProductArray)
cartsRouter.get('/:cid/purchase' , )


export default cartsRouter