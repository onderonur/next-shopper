import { Id } from '@/common/CommonTypes';

export type Product = {
  id: Id;
  category: {
    title: string;
    value: string;
  };
  description: string;
  image: string;
  price: number;
  title: string;
};
