import AppError from '@shared/errors/AppErro';
import { ProductRepository } from '@modules/produts/typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';
import Product from '@modules/produts/typeorm/entities/Product';

interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne({
      where: { id: id },
    });

    
    if (!product) {
      throw new AppError('Product not found!');
    }
    
    const productExists = await productRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is already a product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
