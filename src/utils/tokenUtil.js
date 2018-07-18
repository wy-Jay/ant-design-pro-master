// use localStorage to store the authority info, which might be sent from server in actual project.
export function getToken() {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  return localStorage.getItem('token');
}

export function setToken(token) {
  return localStorage.setItem('token', token);
}
