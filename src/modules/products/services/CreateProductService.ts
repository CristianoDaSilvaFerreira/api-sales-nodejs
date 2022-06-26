import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';


interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already a product with this name');
    }

    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
