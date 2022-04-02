import dbJson from '@src/db/db.json';

export const categoriesService = {
  getManyCategories: () => {
    return dbJson.categories;
  },
};
