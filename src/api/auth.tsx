import http from './http';

export const login = data => {
  console.log(data);
  return http.post('/login', data);
};
