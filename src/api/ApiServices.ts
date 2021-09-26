import { productsService } from './products/productsService';
import { categoriesService } from './categories/categoriesService';
import { checkoutService } from './checkout/checkoutService';

declare module 'next' {
  // Extending original interface from `next`
  interface NextApiRequest {
    services: typeof services;
  }
}

export const services = {
  productsService,
  categoriesService,
  checkoutService,
};
