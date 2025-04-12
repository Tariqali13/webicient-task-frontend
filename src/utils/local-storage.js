import _get from 'lodash/get';

// This function will save the local storage values for user login and signup
export const saveLocalStorageCred = (data) => {
  const userData = JSON.stringify(_get(data, 'data', {}));
  const token = _get(data, 'token', '');
  // eslint-disable-next-line no-undef
  localStorage.setItem('user_data', userData);
  // eslint-disable-next-line no-undef
  localStorage.setItem('token', token);
  return;
};

// This function will save the local storage values for user login and signup
export const removeLocalStorageCred = () => {
  // eslint-disable-next-line no-undef
  localStorage.removeItem('user_data');
  // eslint-disable-next-line no-undef
  localStorage.removeItem('token');
  return;
};