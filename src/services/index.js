import productDao from "../dao/product.mongo.dao.js";
import ProductRepository from "../repositories/product.repository.js";

export default  productService = new ProductRepository(new productDao())