import axios from 'axios';

export const uri = '/mem/product';

export const getProductList = ({ page }) => axios.get(uri + '/list', {
  params: { page, limit: 12, order_by: 'id', order_type: 'desc' }
});

export const getProduct = code => axios.get(uri + `/${code}`);
