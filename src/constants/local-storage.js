/* eslint-disable no-undef */

export const getLocalStorageValues = () => {
  const isWindow = typeof window !== 'undefined';
  const user_data = isWindow ? localStorage.getItem('user_data') : '';
  const token = isWindow ? localStorage.getItem('token') : '';
  const parseUserData = user_data ? JSON.parse(user_data) : {};

  return {
    user_data,
    token,
    parseUserData,
  };
};
