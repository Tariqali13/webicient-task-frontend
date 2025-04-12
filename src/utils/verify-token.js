import axios from 'axios';
import { useRouter } from 'next/router';
import { getLocalStorageValues } from '@/constants/local-storage';
export const userVerifyUserToken = () => {
  const router = useRouter();
  const { token } = getLocalStorageValues();
  if (token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  }
  axios.interceptors.response.use(
    function (response) {
      if (response?.status == '401') {
        router.push('/');
      }
      if (response?.status == '405') {
        router.back();
      }
      return Promise.resolve(response);
    },
    function (error) {
      if (error?.response?.status == '401') {
        router.push('/');
      }
      if (error?.response?.status == '405') {
        router.back();
      }
      return Promise.reject(error);
    },
  );
};
