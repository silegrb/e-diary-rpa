import axios from 'axios';
import { URIS } from '../constants';

export const postLogin = async ({ username, password }) => axios.post(`${URIS.DEPLOYED}/auth/login`, {
  username, password,
});
