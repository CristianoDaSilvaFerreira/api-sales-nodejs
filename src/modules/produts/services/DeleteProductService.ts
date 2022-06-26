import AppError from '@shared/errors/AppErro';
import { ProductRepository } from '@modules/produts/typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';

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
