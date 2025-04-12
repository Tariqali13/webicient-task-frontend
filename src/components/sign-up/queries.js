// @flow
import axios from 'axios';
import { baseURL } from '@/constants/env';
// Design Queries and Mutations Start

export const SIGNUP = async data => {
  const res = await axios.post(`${baseURL}/v1/auth/register`, data);
  return res?.data;
};
