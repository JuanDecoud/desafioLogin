import productDao from "../dao/product.mongo.dao.js";
import ProductRepository from "../repositories/product.repository.js";
import UserDao from "../dao/user.mongo.dao.js"
import UserRepository from "../repositories/user.repository.js";
import CartDao from "../dao/cart.mongo.dao.js"
import CartRepository from "../repositories/cart.repository.js";
import TicketRepository from "../repositories/ticket repository.js";
import TicketMongoDAO from "../dao/ticket.mongo.dao.js";

let productService = new ProductRepository(new productDao())
let userService =new UserRepository(new UserDao())
let cartService = new CartRepository(new CartDao())
let ticketService = new TicketRepository(new TicketMongoDAO())


export default {productService , cartService , userService , ticketService} 


