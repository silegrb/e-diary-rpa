import axios from 'axios';
import { URIS } from '../constants';
import { getToken } from '../utils/user';

export const fetchDepartments = () => axios.get(`${URIS.LOCAL_HOST}/departments`, {
  headers: {
    'x-auth-token': getToken(),
  },
});

export const fetchDepartmentDetails = (id) => axios.get(`${URIS.LOCAL_HOST}/departments/${id}`, {
  headers: {
    'x-auth-token': getToken(),
  },
});
