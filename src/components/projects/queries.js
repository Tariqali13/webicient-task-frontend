// @flow
import axios from 'axios';
import { baseURL } from '@/constants/env';
import _get from 'lodash.get';
// Design Queries and Mutations Start

export const CREATE_PROJECT = async (data) => {
  const res = await axios.post(`${baseURL}/v1/projects`, data);
  return res?.data;
};

export const GET_USER_PROJECTS = async (key) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(baseURL + `/v1/projects`, {
    params: params,
  });
  return res?.data;
};

export const DELETE_PROJECT = async (id) => {
  const res = await axios.delete(`${baseURL}/v1/projects/${id}`);
  return res?.data;
};

export const GET_PROJECT_BY_ID = async (key) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(baseURL + `/v1/projects/${params.id}`);
  return res?.data;
};

export const UPDATE_PROJECT = async (data) => {
  const res = await axios.put(
    `${baseURL}/v1/projects/${data.id}`,
    data.data,
  );
  return res?.data;
};
