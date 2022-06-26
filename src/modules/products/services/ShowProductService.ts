import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';


interface IProduct {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new AppError('Product not found!');
    }

    return product;
  }
}

export default ShowProductService;
