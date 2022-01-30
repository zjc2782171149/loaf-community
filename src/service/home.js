import request from '../utils/request';

export const xxx = (options) => {
  return request({
    url: '接口相对路径',
    method: '方法',
    data: options;
  })
}