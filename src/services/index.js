import productDao from "../dao/product.mongo.dao.js";
import ProductRepository from "../repositories/product.repository.js";
import UserDao from "../dao/user.mongo.dao.js"
import UserRepository from "../repositories/user.repository.js";
import CartDao from "../dao/cart.mongo.dao.js"
import CartRepository from "../repositories/cart.repository.js";

let productService = new ProductRepository(new productDao())
let userService =new UserRepository(new UserDao())
let cartService = new CartRepository(new CartDao())


export default {productService , cartService , userService} 


