import { EntityRepository, Repository, In } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: { name: name },
    });

    return product;
  }

  // Método que garante a pesquisa do produto pelo o ID
  public async findByAllByIds(products: IFindProducts[]): Promise<Product[]> {
    
    // Pecorre o banco de dados capturando o ID de cada produto e armazena na váriavel
    const productids = products.map(products => products.id);

    // O In do TypeORM pesquisa um ID dentro de uma lista, que é a que foi montada acima, garantindo assim que todos os IDs são validos no repositório
    const existsProducts = await this.find({
      where: {
        id: In(productids),
      },
    });

    return existsProducts;
  }
}
