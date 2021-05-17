import axios from 'axios';
import { URIS } from '../constants';
import { getToken } from '../utils/user';

export const fetchProfessorSubjects = () => axios.get(`${URIS.DEPLOYED}/subjects`, {
  headers: {
    'x-auth-token': getToken(),
  },
});
