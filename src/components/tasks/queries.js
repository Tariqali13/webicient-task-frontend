// @flow
import axios from 'axios';
import { baseURL } from '@/constants/env';
import _get from 'lodash.get';
// Design Queries and Mutations Start

export const CREATE_TASK = async (data) => {
  const res = await axios.post(`${baseURL}/v1/tasks`, data);
  return res?.data;
};

export const GET_ALL_TASKS = async (key) => {
  const params = _get(key, 'queryKey[1]', {});
  for (let key in params) {
    if (params[key] === '' || params[key] === null) {
      delete params[key];
    }
  }
  const res = await axios.get(baseURL + `/v1/tasks`, {
    params: params,
  });
  return res?.data;
};

export const DELETE_TASK = async (id) => {
  const res = await axios.delete(`${baseURL}/v1/tasks/${id}`);
  return res?.data;
};

export const GET_TASK_BY_ID = async (key) => {
  const params = _get(key, 'queryKey[1]', {});
  const res = await axios.get(baseURL + `/v1/tasks/${params.id}`);
  return res?.data;
};

export const UPDATE_TASK = async (data) => {
  const res = await axios.put(`${baseURL}/v1/tasks/${data.id}`, data.data);
  return res?.data;
};

export const UPDATE_TASK_STATUS = async (data) => {
  const res = await axios.put(
    `${baseURL}/v1/tasks/status-update/${data.id}`,
    data.data,
  );
  return res?.data;
};

export const UPDATE_TASK_ORDER = async (data) => {
  const res = await axios.put(
    `${baseURL}/v1/tasks/reorder/${data.id}`,
    data.data,
  );
  return res?.data;
};
