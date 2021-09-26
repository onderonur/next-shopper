import dbJson from '@src/api/db/db.json';
import createHttpError from 'http-errors';
import { Id } from '@src/common/CommonTypes';
import { productSorting } from '@src/products/ProductsUtils';

export type GetManyProductsArgs = {
  category?: string;
  sorting?: string;
};

export interface GetOneProductByIdArgs {
  productId: Id;
}

export const productsService = {
  getManyProducts: (args: GetManyProductsArgs) => {
    let response = dbJson.products;
    if (args.category) {
      response = response.filter(
        (product) => product.category === args.category,
      );
    }
    if (args.sorting) {
      if (args.sorting === productSorting.priceAsc.id) {
        response = response.sort((a, b) => a.price - b.price);
      } else if (args.sorting === productSorting.priceDesc.id) {
        response = response.sort((a, b) => b.price - a.price);
      }
    }
    return response;
  },
  getOneProductById: (args: GetOneProductByIdArgs) => {
    const found = dbJson.products.find(
      (product) => product.id === args.productId,
    );

    if (!found) {
      throw new createHttpError.NotFound('Product not found');
    }

    return found;
  },
};
