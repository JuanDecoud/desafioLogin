import { Router } from 'express'
import productdb from '../dao/models/product.model.js'
import cartModel from '../dao/models/cart.model.js'
import { comprobateLoggueUser } from '../middlewares/user.middleware.js'
import CartController from '../controllers/cart.controller.js'
let cartController = new CartController()
import ProductController from '../controllers/products.controllers.js'
let productController = new ProductController ()

const viewRouter = Router ()

viewRouter.get('/products/details' ,async(req,res)=>{

    try{
        let productId = req.query.productId
        let cartId = req.query.cartId
        let product = await productdb.findOne({'_id': productId}).lean()
        if(cartId)product.cartId=cartId
        if(product)res.render('productsDetails' , product)
        else res.status(400).json ({status: error , message : "product dosnt exist"})

    }catch (err){
        res.json ({status : "error" , message : err.message })
    }
})

viewRouter.get('/carts/:cid' ,async(req,res)=>{
    let cartID =req.params.cid
    try{
        let cart = await cartModel.findOne({"_id": cartID}).lean()
        res.render('cartView' , {cart})
    }catch (err){
        res.json ({status : "error" , message : err.message })
    }
})
viewRouter.get ('/login' , (req,res)=>{res.render ('login')})
viewRouter.get ('/register' , (req,res)=>{res.render ('register')})
viewRouter.get ('/loginError', (req,res)=>{res.render ('errors/loginError')})
viewRouter.get('/addProduct', (req,res)=>{res.render('addProducts')})
viewRouter.get('/userCart',comprobateLoggueUser,cartController.showUserCart )
viewRouter.get('/products' , comprobateLoggueUser , productController.showHomeProducts )
viewRouter.get('/realtimeproducts' , async(req,res) =>{res.render('realTimeProductos')})










export default viewRouter