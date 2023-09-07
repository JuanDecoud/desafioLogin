import { Router } from 'express';
import productController from '../controllers/products.controllers.js';
import { comprobateAdmin, comprobateLoggueUser } from '../middlewares/user.middleware.js';

const productRouter = Router();
let prControllers = new productController()

productRouter.get ('/' ,comprobateLoggueUser,prControllers.showProducts)
productRouter.get ('/mockingproducts' , )
productRouter.post(`/`,comprobateLoggueUser , comprobateAdmin,prControllers.cpUpload,prControllers.addProduct)
productRouter.put(`/:pid` ,comprobateLoggueUser,comprobateAdmin,prControllers.updateProducts )
productRouter.delete (`/:pid`,comprobateLoggueUser,comprobateAdmin ,prControllers.deleteProduct)


export default productRouter ;