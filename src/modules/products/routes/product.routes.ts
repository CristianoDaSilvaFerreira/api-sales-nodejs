import { Router } from 'express';
import ProductsController from '../controller/ProductService';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.indexProduct);
productsRouter.get('/:id', productsController.showProduct);

productsRouter.post('/', productsController.createProduct);

productsRouter.put('/:id', productsController.updateProduct);

productsRouter.delete('/:id', productsController.deleteProduct);

export default productsRouter;
