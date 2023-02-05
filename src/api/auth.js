import axios from 'axios';

export const uri = '/mem/user';

export const getAuthUser = () => axios.get(uri);

export const enableUser = (token) => axios.put(uri + '/account/active/' + `${token}`);

export const updateUser = (params) => axios.put(uri, params);

export const signup = (params) => axios.post(uri + '/create', params);

export const login = ({ account, password }) => axios.post(uri + '/login', { account, password });

export const logout = () => axios.post(uri + '/logout');

export const sendPassword = (email) => axios.post(uri + '/reset/password', { email: email });

export const resetPassword = (token, { password, password_confirmation }) => axios.put(uri + '/reset/password/' + `${token}`, { password, password_confirmation });

export const resendVerifyMail = (email) => axios.post(uri + '/create/resend', { email: email });
