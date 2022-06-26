import AppError from '@shared/errors/AppErro';
import { ProductRepository } from '@modules/produts/typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';
import Product from '@modules/produts/typeorm/entities/Product';

interface IProduct {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IProduct): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = productRepository.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new AppError('Product not found!');
    }

    return product;
  }
}

export default ShowProductService;
