import axios from 'axios';

export const uri = '/mem/product/order';

export const createOrder = (params) => axios.post(uri + '/' + params.code, params);

export const getOrderRecord = ({ page }) => axios.get(uri + '/list', {
  params: { page, order_by: 'order_datetime', order_type: 'desc' }
});

export const getOrderDetail = no => axios.get(uri + `/${no}`);
