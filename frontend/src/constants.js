import Login from './components/Login';
import Departments from './containers/Departments';

export const ROLES = {
  TEACHER: 'ROLE_TEACHER',
  STUDENT: 'ROLE_STUDENT',
};

export const ROUTES = [
  {
    component: Login,
    path: '/',
  },
  {
    component: Departments,
    path: '/departments',
    role: ROLES.TEACHER,
  },
];

export const URIS = {
  LOCAL_HOST: 'http://localhost:5000',
};
