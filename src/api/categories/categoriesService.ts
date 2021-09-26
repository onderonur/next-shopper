import dbJson from '@src/api/db/db.json';

export const categoriesService = {
  getManyCategories: () => {
    return dbJson.categories;
  },
};
