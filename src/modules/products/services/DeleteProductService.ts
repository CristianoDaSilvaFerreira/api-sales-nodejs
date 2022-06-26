import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface IProduct {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IProduct): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await productsRepository.remove(product);

    return product;
  }
}

export default DeleteProductService;