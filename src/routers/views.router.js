import { Router } from 'express'
import productdb from '../dao/models/product.model.js'
import cartModel from '../dao/models/cart.model.js'
import { comprobateLoggueUser , comprobateAdmin, comprobateUser} from '../middlewares/user.middleware.js'
import CartController from '../controllers/cart.controller.js'
let cartController = new CartController()
import ProductController from '../controllers/products.controllers.js'
let productController = new ProductController ()

const viewRouter = Router ()

viewRouter.get('/products/details' ,comprobateLoggueUser,productController.showPorductDetail)
viewRouter.get ('/login' , (req,res)=>{res.render ('login')})
viewRouter.get ('/register' , (req,res)=>{res.render ('register')})
viewRouter.get ('/loginError', (req,res)=>{res.render ('errors/loginError')})
viewRouter.get('/addProduct',comprobateLoggueUser ,comprobateAdmin,(req,res)=>{res.render('addProducts')})
viewRouter.get('/userCart',comprobateLoggueUser , comprobateUser,cartController.showUserCart )
viewRouter.get('/products' , comprobateLoggueUser , productController.showHomeProducts )
viewRouter.get('/realtimeproducts' , async(req,res) =>{res.render('realTimeProductos')})










export default viewRouter