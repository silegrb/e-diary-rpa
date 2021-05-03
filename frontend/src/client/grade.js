import axios from 'axios';
import { URIS } from '../constants';
import { getToken } from '../utils/user';

export const fetchStudentGrades = (id) => axios.get(`${URIS.LOCAL_HOST}/grades/student-grades/${id}`, {
  headers: {
    'x-auth-token': getToken(),
  },
});
