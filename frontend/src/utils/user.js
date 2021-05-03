import { ROLES } from '../constants';

export const getUserRole = () => JSON.parse(localStorage.getItem('user'))?.role;

export const getDefaultRedirect = () => {
  const role = getUserRole();
  switch (role) {
    case ROLES.TEACHER:
      return '/departments';
    case ROLES.STUDENT:
      return '/my-grades';
    default:
      return '/';
  }
};

export const getAvatarInitials = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) { return ''; }
  return `${user.name[0]}${user.surname[0]}`;
};

export const getUserId = () => {
  const { _id } = JSON.parse(localStorage.getItem('user'));
  return _id;
};

export const getToken = () => localStorage.getItem('token');
