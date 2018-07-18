import request from '../utils/request';

export async function query(code) {
  return request(`/api/${code}`,{
    method: 'get',
  });
}
