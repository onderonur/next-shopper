import 'server-only';
import dbJson from '@src/db/db.json';
import { wait } from '@src/common/CommonUtils';

export const categoriesService = {
  getManyCategories: async () => {
    await wait();
    return dbJson.categories;
  },
};
