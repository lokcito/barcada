import baseService from './baseService.js';

export const productService = {
  filter: (keyword, params) => baseService({
	  'method': 'GET',
	  'url': `products`,
	  'params': params
  }),
};
