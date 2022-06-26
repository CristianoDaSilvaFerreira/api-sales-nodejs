import { ProductRepository } from '@modules/produts/typeorm/repositories/ProductRepository';
import { getCustomRepository } from 'typeorm';
import Product from '@modules/produts/typeorm/entities/Product';


class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);
  
    const products = await productRepository.find();

    return products;
  }
}

export default ListProductService;
