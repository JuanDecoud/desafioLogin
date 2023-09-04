import { Router } from 'express';

import ProductManager from '../dao/modelsFs/ProductManager.js'
import productModel from '../dao/models/product.model.js'
import productController from '../controllers/products.controllers.js';



const productRouter = Router();
const productManager = new ProductManager (`./src/data/products.json`, `utf-8`)
let prControllers = new productController()

productRouter.get ('/' ,prControllers.showProducts)
productRouter.post(`/`,prControllers.cpUpload,prControllers.addProduct)
productRouter.put(`/:pid` ,prControllers.updateProducts )
productRouter.delete (`/:pid`, prControllers.deleteProduct)


export default productRouter ;