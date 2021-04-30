import axios from 'axios';

export const postLogin = async ({ username, password }) => axios.post('http://localhost:5000/auth/login', {
  username, password,
});
