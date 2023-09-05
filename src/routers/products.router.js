import { Router } from 'express';

import ProductManager from '../dao/modelsFs/ProductManager.js'
import productModel from '../dao/models/product.model.js'
import productController from '../controllers/products.controllers.js';
import { comprobateAdmin, comprobateLoggueUser } from '../middlewares/user.middleware.js';



const productRouter = Router();
const productManager = new ProductManager (`./src/data/products.json`, `utf-8`)
let prControllers = new productController()

productRouter.get ('/' ,comprobateLoggueUser,prControllers.showProducts)
productRouter.post(`/`,comprobateLoggueUser , comprobateAdmin,prControllers.cpUpload,prControllers.addProduct)
productRouter.put(`/:pid` ,comprobateLoggueUser,comprobateAdmin,prControllers.updateProducts )
productRouter.delete (`/:pid`,comprobateLoggueUser,comprobateAdmin ,prControllers.deleteProduct)


export default productRouter ;