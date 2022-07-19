import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRespository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductRepository';
import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrderRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const customersRepository = getCustomRepository(CustomersRepository);

    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);

     // Verificando se o cliente existe
    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    // Verificando se os existem, procurando por ID do produto
    const existsProducts = await productsRepository.findByAllByIds(products);

    // Verificando se existem um "tamanho" no produto, ou seja se tem algum produto
    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    // Verificando se todos os produtos foram encontrados, pois pode passa somente alguns. Pegando o que foi retornado dos IDs encontrados, e capturando esses IDs encontrados
    const existsProductsIds = existsProducts.map(product => product.id);

    // Chegando se algum produto é inexistente
    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    // Verifica se algum produto enviado não existe
    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
      );
    }

    // Verificando a quantidade se é valida
    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    // Verificando se tem a quantidade de produtos para ser vendidas, garantindo que não posssa venda uma quantidade maior que tem no estoque
    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
         is not available for ${quantityAvailable[0].id}.`,
      );
    }

    // Motando o objeto que é para ser salva
    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    // Pergando o order_products para atualizar a quantidade
    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}
