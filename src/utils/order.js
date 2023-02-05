export const setOrder = order => localStorage.setItem('order', JSON.stringify(order));

export const removeOrder = () => localStorage.removeItem('order');

export const getOrder = () => JSON.parse(localStorage.getItem('order'));

export const checkOrder = () => localStorage.getItem('order') !== null;
