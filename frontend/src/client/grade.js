import axios from 'axios';
import { URIS } from '../constants';
import { getToken } from '../utils/user';

export const fetchStudentGrades = (id) => axios.get(`${URIS.LOCAL_HOST}/grades/student-grades/${id}`, {
  headers: {
    'x-auth-token': getToken(),
  },
});

export const postStudentGrade = (data) => axios.post(`${URIS.LOCAL_HOST}/grades/add`,
  data,
  {
    headers: {
      'x-auth-token': getToken(),
    },
  });
