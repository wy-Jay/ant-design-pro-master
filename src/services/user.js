import request from '../utils/request';

export async function query(params) {
  return request('ywwl-lottery-web/user/list/webUser',{
    method: 'get',
    data: params,
  });
}

export async function queryCurrent() {
  return request('ywwl-lottery-web/currentUser');
}
