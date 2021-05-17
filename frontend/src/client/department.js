import axios from 'axios';
import { URIS } from '../constants';
import { getToken } from '../utils/user';

export const fetchDepartments = () => axios.get(`${URIS.DEPLOYED}/departments`, {
  headers: {
    'x-auth-token': getToken(),
  },
});

export const fetchDepartmentDetails = (id) => axios.get(`${URIS.DEPLOYED}/departments/${id}`, {
  headers: {
    'x-auth-token': getToken(),
  },
});
