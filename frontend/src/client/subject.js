import axios from 'axios';
import { URIS } from '../constants';
import { getToken } from '../utils/user';

export const fetchProfessorSubjects = () => axios.get(`${URIS.LOCAL_HOST}/subjects`, {
  headers: {
    'x-auth-token': getToken(),
  },
});
