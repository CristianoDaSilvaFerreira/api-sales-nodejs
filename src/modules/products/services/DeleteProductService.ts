import AppError from '@shared/errors/AppErro';

import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface IProduct {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IProduct): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new AppError('Product not found!');
    }

    await productRepository.remove(product);
  }
}

export default DeleteProductService;
