import { Router } from 'express'
import CartManager from '../dao/modelsFs/CartManager.js'
import ProductManager from "../dao/modelsFs/ProductManager.js"
import cartModel from '../dao/models/cart.model.js'
import productModel from '../dao/models/product.model.js'
import { comprobateMongoId } from '../utils/utils.js'
import CartController from '../controllers/cart.controller.js'

const cartsRouter = Router ()
const cartManager = new CartManager (`./src/data/carts.json`, `utf-8`)
const productManager = new ProductManager (`./src/data/products.json`, `utf-8`)
const cartController = new CartController ()


cartsRouter.post ('/:cid/products/:pid' ,cartController.updateCart )
cartsRouter.post ('/',cartController.createCart)
cartsRouter.get('/:cid',cartController.findCart)
cartsRouter.delete('/:cid/product/:pid', cartController.deleteProduct)
cartsRouter.put('/:cid' , cartController.putProductArray)


export default cartsRouter