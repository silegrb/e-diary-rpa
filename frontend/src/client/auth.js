import axios from 'axios';
import { URIS } from '../constants';

export const postLogin = async ({ username, password }) => axios.post(`${URIS.LOCAL_HOST}/auth/login`, {
  username, password,
});
