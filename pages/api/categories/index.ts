import { StatusCodes } from 'http-status-codes';
import { createHandler } from '@src/api/ApiUtils';
import { Category } from '@src/categories/CategoriesTypes';

export default createHandler<{ GET: Category[] }>({
  GET: (req, res) => {
    const response = req.services.categoriesService.getManyCategories();
    res.status(StatusCodes.OK).json(response);
  },
});
