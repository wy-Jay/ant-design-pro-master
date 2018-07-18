import request from '../utils/request';

export async function query(params) {
  return request('/user/list/webUser',{
    method: 'get',
    data: params,
  });
}

export async function queryCurrent() {
  return request('/currentUser',{
    method: 'get',
  });
}
